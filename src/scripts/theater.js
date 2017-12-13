(function() {

  const
  /*
   * Merge two objects into one, values in b take precedence over values in a
   *
   * @param a {Object}
   * @param b {Object}

   * @return Object
   */
  merge = function(a, b) {
    const o = {};
    let i;
    for (i in a) {
      if (a.hasOwnProperty(i)) {
        o[i] = a[i];
      }
    }
    if (! b) {
      return o;
    }
    for (i in b) {
      if (b.hasOwnProperty(i)) {
        o[i] = b[i];
      }
    }
    return o;
  };

//  let
// is the browser window in focus?
//  FOCUS = true;

  const Theater = function(options) {

    this.options = merge( { debug: false }, options);
    let playing = false;
    const
    self = this;

    this.parent = typeof options.node === 'string' ? document.querySelector(options.node) : options.node;

    const
    aspect = this.options.hasOwnProperty('aspect') ? this.options.aspect :  16 / 9,
    events = { // default event listeners
      load: function() {
        if (self.options.debug) {
          console.log('video loaded');
        }
      }
    };

    this.video = this.parent ? document.createElement('video') : null;

    if (! this.video) {
      throw new Error('Invalid root in Theater constructor');
      return;
    }

    this.parent.classList.add('vw-theater-root');

    this.video.addEventListener('loadeddata', () => {
      events.load();
      playing = true;
      self.parent.classList.add('vw-theater-loaded');
    });

    this.video.addEventListener('play', () => {
    console.log('play!!');
      playing = true;
    });
    this.video.addEventListener('pause', () => {
    console.log('pause!!');
      playing = false;
    });

    const curtains = document.createElement('div');
    curtains.classList.add('vw-theater-curtains');

    const attrs = merge({
      muted: 'muted',
      loop: 'loop',
      autoplay: 'autoplay',
      preload: 'auto'
    }, options.attrs);

    for (const i in attrs) {
      if (attrs.hasOwnProperty(i)) {
        this.video.setAttribute(i, attrs[i]);
      }
    }
    document.body.classList.add('vw-theater');

    const resizer = () => {

      const computed = window.getComputedStyle(self.parent),
      size = {
        width: self.options.resize ? window.innerWidth : parseInt(computed.width, 10),
        height: self.options.resize ? window.innerHeight : parseInt(computed.width, 10)
      };

//      section.style.width = width + 'px';
//      section.style.height = parseInt(computed.height, 10) + 'px';

      if ((size.width / size.height) > aspect) {
        self.video.style.width = size.width + 'px';
        self.video.style.height = '';
      } else {
        self.video.style.height = size.height + 'px';
        self.video.style.width = '';
      }

      if (self.options.debug) {
        console.log('resized video to ' + JSON.stringify(size));
      }
    };
    resizer();

    if (options.resize) {
      window.addEventListener('resize', () => {
        resizer();
      });
    }

    window.addEventListener('blur', () => {
      self.video.pause();
    });

    window.addEventListener('focus', () => {
      self.video.play();
    });

    // add curtains and <video> element to parent
    this.parent.insertBefore(this.video, this.parent.childNodes[0]);
    this.parent.insertBefore(curtains, this.parent.childNodes[0]);

    /**
     * Begin loading the video
     *
     * @param {String} src - optional, string to apply to `src` attribute of the <video> element
     * @return {Object} instance for chaining
     * @chainable
     */
    this.load = function(src) {

      if (arguments.length > 0) {
        this.video.setAttribute('src', src);
        return;
      }

      for (const i in this.options.sources) {
        if (! this.options.sources.hasOwnProperty(i)) {
          continue;
        }
        const node = document.createElement('source');
        node.setAttribute('type', i);
        node.setAttribute('src', this.options.sources[i]);
        this.video.appendChild(node);
      }

      return this;
    };

    /**
     * Toggle play/pause state of <video> element
     *
     * @return {Object} - instance for chaining
     * @chainable
     */
    this.playPause = function() {
      if (self.options.debug) {
        console.log('toggling play/pause');
      }
      if (playing) {
        this.video.pause();
      } else {
        this.video.play();
      }

      return this;
    };

    /**
     * Add event listeners to instance
     *
     * @param {string} eventName name of event to attach listener to
     * @param {function} func function to invoke when relevant event is triggered
     * @return {Object} instance for chaining
     * @chainable
     */
    this.on = function(eventName, func) {
      events[eventName] = func;
      return this;
    };

    /**
     * Retrieve a description of an instance
     *
     * @return {string} description of object
     */
    this.toString = function() {
      return JSON.stringify({ parent: this.parent, options: self.options});
    };

  };



  module.exports = Theater;
})();