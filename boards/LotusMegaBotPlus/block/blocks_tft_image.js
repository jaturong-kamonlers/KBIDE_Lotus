// ============================================================
// TFT Image block for LotusMegaBot++
// FieldImagePicker = FieldTextInput subclass (so click routes to showEditor_)
// but visually renders an SVG <image> instead of text.
// Shows upload icon when empty, thumbnail of picked image otherwise.
// ============================================================
module.exports = function(Blockly){
  'use strict';
  var TFT_COLOUR = 200;
  var DEFAULT_MAX = 80;
  var ICON_SIZE = 48;

  var UPLOAD_ICON =
    'data:image/svg+xml;base64,' +
    'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAy' +
    'NCAyNCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ij48cmVjdCB4PSIyIiB5PSIzIiB3aWR0aD0i' +
    'MjAiIGhlaWdodD0iMTgiIGZpbGw9IiNGQUZBRkEiIHN0cm9rZT0iIzE5NzZEMiIgc3Ryb2tl' +
    'LXdpZHRoPSIxLjIiIHJ4PSIyIi8+PGNpcmNsZSBjeD0iNyIgY3k9IjkiIHI9IjEuNiIgZmls' +
    'bD0iI0ZGQTcyNiIvPjxwYXRoIGQ9Ik0gNCAxOCBMIDkgMTMgTCAxMiAxNiBMIDE2IDExIEwg' +
    'MjAgMTggWiIgZmlsbD0iIzY2QkI2QSIvPjxjaXJjbGUgY3g9IjE4IiBjeT0iNiIgcj0iNC41' +
    'IiBmaWxsPSIjMTk3NkQyIi8+PHBhdGggZD0iTSAxOCAzLjUgTCAxOCA4LjUgTSAxNS41IDYg' +
    'TCAxOCAzLjUgTCAyMC41IDYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUi' +
    'IGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJy' +
    'b3VuZCIvPjwvc3ZnPg==';

  var SIZE_OPTIONS = [
    ['32 px (icon)',          '32'],
    ['48 px',                 '48'],
    ['64 px',                 '64'],
    ['80 px',                 '80'],
    ['96 px',                 '96'],
    ['112 px',                '112'],
    ['Fit Portrait 128x160',  'fit'],
    ['Fit Landscape 160x128', 'fit_l']
  ];

  // ---------- Custom field: ImagePicker ----------
  // IMPORTANT: subclass FieldTextInput so Blockly classic routes block clicks
  // to showEditor_. FieldImage subclass does NOT receive auto-routed clicks
  // in this Blockly version (onMouseDown_ checks `instanceof FieldTextInput`).
  function FieldImagePicker(value) {
    Blockly.FieldTextInput.call(this, '');
    this._stored = value ? String(value) : '';
    this.SERIALIZABLE = true;
    this.EDITABLE = true;
  }
  FieldImagePicker.prototype = Object.create(Blockly.FieldTextInput.prototype);
  FieldImagePicker.prototype.constructor = FieldImagePicker;
  FieldImagePicker.superClass_ = Blockly.FieldTextInput.prototype;

  // --- storage ---
  FieldImagePicker.prototype.setValue = function(newValue) {
    if (newValue == null) newValue = '';
    newValue = String(newValue);
    var oldValue = this._stored || '';
    if (oldValue !== newValue) {
      if (this.sourceBlock_ && Blockly.Events && Blockly.Events.isEnabled && Blockly.Events.isEnabled()) {
        try {
          Blockly.Events.fire(new Blockly.Events.Change(
            this.sourceBlock_, 'field', this.name, oldValue, newValue));
        } catch (e) {}
      }
      this._stored = newValue;
      this.value_ = newValue;
    }
    this._updateIcon();
  };
  FieldImagePicker.prototype.getValue = function() { return this._stored || ''; };
  FieldImagePicker.prototype.getText = function() { return ''; };       // we render an image, not text

  FieldImagePicker.prototype.toXml = function(el) { el.textContent = this._stored || ''; return el; };
  FieldImagePicker.prototype.fromXml = function(el) { this.setValue(el.textContent || ''); };

  // --- init: hide text, install icon image ---
  FieldImagePicker.prototype.init = function() {
    Blockly.FieldTextInput.prototype.init.call(this);
    this._installIcon();
    var self = this;
    setTimeout(function(){ self._updateIcon(); }, 0);
  };

  FieldImagePicker.prototype._installIcon = function() {
    if (!this.fieldGroup_) return;
    if (this.textElement_) this.textElement_.style.display = 'none';
    if (!this._iconEl) {
      var ns = 'http://www.w3.org/2000/svg';
      this._iconEl = document.createElementNS(ns, 'image');
      this._iconEl.setAttribute('width',  ICON_SIZE);
      this._iconEl.setAttribute('height', ICON_SIZE);
      this._iconEl.setAttribute('x', 0);
      this._iconEl.setAttribute('y', 0);
      // Keep pointer-events ON so Blockly's field click routing sees the click
      this.fieldGroup_.appendChild(this._iconEl);
    }
  };

  FieldImagePicker.prototype._updateIcon = function() {
    this._installIcon();
    if (!this._iconEl) return;
    var url = UPLOAD_ICON;
    if (this._stored) {
      url = this._previewUrlCache || this._buildPreviewFromStored() || UPLOAD_ICON;
    }
    try {
      this._iconEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', url);
      this._iconEl.setAttribute('href', url);
    } catch (e) {}
  };

  // Override render_ so block layout reserves icon-sized space instead of text width
  FieldImagePicker.prototype.render_ = function() {
    this._installIcon();
    if (!this.size_) this.size_ = { width: 0, height: 0 };
    this.size_.width  = ICON_SIZE + 4;   // small horizontal padding
    this.size_.height = ICON_SIZE;
  };

  // --- click handler: open file picker (called by Blockly's field-click routing) ---
  FieldImagePicker.prototype.showEditor_ = function(opt_quietInput) {
    var self = this;
    try { if (Blockly.WidgetDiv && Blockly.WidgetDiv.hide) Blockly.WidgetDiv.hide(); } catch (e) {}
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/jpg,image/gif,image/bmp,image/webp';
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.addEventListener('change', function(e){
      var file = e.target.files && e.target.files[0];
      var cleanup = function(){ if (input.parentNode) input.parentNode.removeChild(input); };
      if (!file) { cleanup(); return; }
      var reader = new FileReader();
      reader.onload = function(ev){
        var img = new Image();
        img.onload = function(){
          try { self._processImage(img, self._getTargetOpt()); }
          catch (err) { console.error('Image process failed:', err); alert('Image process failed: ' + err.message); }
          cleanup();
        };
        img.onerror = function(){ cleanup(); alert('Cannot decode image'); };
        img.src = ev.target.result;
      };
      reader.onerror = function(){ cleanup(); alert('Cannot read file'); };
      reader.readAsDataURL(file);
    });
    setTimeout(function(){ input.click(); }, 0);
  };

  // ---- size + processing helpers ----
  FieldImagePicker.prototype._getTargetOpt = function() {
    if (this.sourceBlock_) {
      var sz = this.sourceBlock_.getFieldValue && this.sourceBlock_.getFieldValue('SIZE');
      if (sz) return sz;
    }
    return String(DEFAULT_MAX);
  };

  FieldImagePicker.prototype._resolveTarget = function(srcW, srcH, opt) {
    if (opt === 'fit') {
      var s = Math.min(128 / srcW, 160 / srcH);
      return {w: Math.max(1, Math.floor(srcW * s)), h: Math.max(1, Math.floor(srcH * s))};
    }
    if (opt === 'fit_l') {
      var sL = Math.min(160 / srcW, 128 / srcH);
      return {w: Math.max(1, Math.floor(srcW * sL)), h: Math.max(1, Math.floor(srcH * sL))};
    }
    var n = Number(opt);
    if (!n || n <= 0) n = DEFAULT_MAX;
    var sc = Math.min(n / srcW, n / srcH, 1);
    return {w: Math.max(1, Math.floor(srcW * sc)), h: Math.max(1, Math.floor(srcH * sc))};
  };

  FieldImagePicker.prototype._processImage = function(img, opt) {
    var srcW = img.naturalWidth || img.width;
    var srcH = img.naturalHeight || img.height;
    if (!srcW || !srcH) throw new Error('zero-size image');
    this._sourceImage = img; this._sourceW = srcW; this._sourceH = srcH;
    var canvas = this._renderResized(img, srcW, srcH, opt);
    this._storeFromCanvas(canvas);
  };

  FieldImagePicker.prototype._resizeStoredTo = function(newOpt) {
    try {
      if (this._sourceImage && this._sourceW && this._sourceH) {
        var dst = this._renderResized(this._sourceImage, this._sourceW, this._sourceH, newOpt);
        this._storeFromCanvas(dst);
        return;
      }
      var v = JSON.parse(this._stored || '');
      if (!v || !v.w || !v.h || !v.data) return;
      var t = this._resolveTarget(v.w, v.h, newOpt);
      if (t.w === v.w && t.h === v.h) return;
      var srcCanvas = this._rgb565ToCanvas(v.w, v.h, v.data);
      var dst2 = this._renderResized(srcCanvas, v.w, v.h, newOpt);
      this._storeFromCanvas(dst2);
    } catch (e) { console.error('resize failed:', e); }
  };

  FieldImagePicker.prototype._renderResized = function(srcLike, srcW, srcH, opt) {
    var t = this._resolveTarget(srcW, srcH, opt);

    // Step down by halves while source is >2x target. Single-pass downscale of
    // a huge photo (e.g. 4000x3000 -> 64x64) loses too much detail even with
    // imageSmoothingQuality='high'; halving preserves more.
    var curSrc = srcLike, curW = srcW, curH = srcH;
    while (curW > t.w * 2 && curH > t.h * 2) {
      var halfW = Math.max(t.w, Math.floor(curW / 2));
      var halfH = Math.max(t.h, Math.floor(curH / 2));
      var step = document.createElement('canvas');
      step.width = halfW; step.height = halfH;
      var sctx = step.getContext('2d');
      sctx.imageSmoothingEnabled = true;
      sctx.imageSmoothingQuality = 'high';
      sctx.drawImage(curSrc, 0, 0, halfW, halfH);
      curSrc = step; curW = halfW; curH = halfH;
    }

    var c = document.createElement('canvas');
    c.width = t.w; c.height = t.h;
    var ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, t.w, t.h);
    ctx.drawImage(curSrc, 0, 0, t.w, t.h);
    return c;
  };

  FieldImagePicker.prototype._storeFromCanvas = function(canvas) {
    var w = canvas.width, h = canvas.height;
    var px = canvas.getContext('2d').getImageData(0, 0, w, h).data;
    var buf = new Uint8Array(w * h * 2);
    for (var i = 0; i < w * h; i++) {
      var r = px[i*4]     >> 3;
      var g = px[i*4 + 1] >> 2;
      var b = px[i*4 + 2] >> 3;
      var rgb = ((r << 11) | (g << 5) | b) & 0xFFFF;
      buf[i*2]     = rgb & 0xFF;
      buf[i*2 + 1] = (rgb >> 8) & 0xFF;
    }
    var bin = '';
    for (var k = 0; k < buf.length; k++) bin += String.fromCharCode(buf[k]);
    var b64 = btoa(bin);
    this._previewUrlCache = canvas.toDataURL('image/png');
    this.setValue(JSON.stringify({w: w, h: h, data: b64}));
    console.log('TFT image:', w + 'x' + h, '(stored=' + this._stored.length + ' chars, ~' + (w*h*2) + ' B PROGMEM)');
  };

  FieldImagePicker.prototype._rgb565ToCanvas = function(w, h, b64) {
    var bin = atob(b64);
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    var imgData = ctx.createImageData(w, h);
    for (var i = 0; i < w * h; i++) {
      var lo = bin.charCodeAt(i*2);
      var hi = bin.charCodeAt(i*2 + 1);
      var rgb = (hi << 8) | lo;
      imgData.data[i*4]   = ((rgb >> 11) & 0x1F) << 3;
      imgData.data[i*4+1] = ((rgb >> 5)  & 0x3F) << 2;
      imgData.data[i*4+2] = ( rgb        & 0x1F) << 3;
      imgData.data[i*4+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    return c;
  };

  FieldImagePicker.prototype._buildPreviewFromStored = function() {
    try {
      var v = JSON.parse(this._stored || '');
      if (!v || !v.w || !v.h || !v.data) return null;
      return this._rgb565ToCanvas(v.w, v.h, v.data).toDataURL('image/png');
    } catch (e) { return null; }
  };

  Blockly.FieldImagePicker = FieldImagePicker;

  // ---------- Block: tft_draw_image ----------
  Blockly.Blocks['tft_draw_image'] = {
    init: function() {
      var thisBlock = this;
      var sizeField = new Blockly.FieldDropdown(SIZE_OPTIONS, function(newVal) {
        var picker = thisBlock.getField && thisBlock.getField('IMG');
        if (picker && picker._stored) {
          setTimeout(function(){ picker._resizeStoredTo(newVal); }, 0);
        }
        return newVal;
      });
      sizeField.setValue('80');

      this.appendDummyInput()
          .appendField('TFT image')
          .appendField(new FieldImagePicker(''), 'IMG')
          .appendField('size')
          .appendField(sizeField, 'SIZE');
      this.appendValueInput('X').setCheck('Number').appendField('at x');
      this.appendValueInput('Y').setCheck('Number').appendField('y');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(TFT_COLOUR);
      this.setTooltip('Click the upload icon to pick a PNG/JPG/GIF/BMP. Choose size first for best quality.');
    }
  };
};
