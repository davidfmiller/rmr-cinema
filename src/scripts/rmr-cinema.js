


(() => {

  const

  PREFIX = 'rmr-cinema',

  RMR = require('rmr-util');

  /**
   *
   *
   * @params {Object} options - containing the following keys
   *    node {String|Node} - the parent node to append the <video> object to
   *    debug {Boolean, optional} - if `true`, debug messages will be logged to the browser console on
   *.   events {Object, optional} - 
   *.   attrs {Object, optional} - list of attributes that should be applied to the <video> element (ex: `{'muted' : 1}`)
   */
  const Cinema = function(options) {

    this.options = RMR.Object.merge({ debug: false }, options);
    let playing = false;

    const
    self = this;

    this.parent = RMR.Node.get(options.node);

    let
    events = { // default event listeners
      load: function() { }
    };

    events = RMR.Object.merge(events, options.events);

    this.video = this.parent ? RMR.Node.create('video') : null;

    if (! this.video) {
      throw new Error('Invalid root in rmr-cinema constructor `' +  options.node + '`');
      return;
    }

    this.parent.classList.add(PREFIX);

    this.video.addEventListener('loadeddata', () => {

      if (self.debug) {
        console.log('cinema loaded');
      }
      events.load();
//      playing = true;
      self.parent.classList.add('rmr-loaded');
      self.play();
    });

    this.video.addEventListener('play', () => {
//      console.log('play!!');
      playing = true;

      let button = self.parent.querySelector('button');
      if (button) {
        button.parentNode.removeChild(button);
      }

    });
    this.video.addEventListener('pause', () => {

      if (self.debug) {
        console.log('cinema paused');
      }
      playing = false;
    });

    const curtains = RMR.Node.create('div', { class: 'rmr-curtains', 'aria-hidden': true });

    const attrs = RMR.Object.merge({
      loop: 'loop',
      muted: 'true',
//      autoplay: 'autoplay',
      preload: 'auto'
    }, options.attrs);

    for (const i in attrs) {
      if (RMR.Object.has(attrs, i)) {
        if (attrs[i]) {
          this.video.setAttribute(i, attrs[i]);
        }
      }
    }

    window.addEventListener('blur', () => {
      try {
        self.video.pause();
      } catch (e) {
        console.error(e);
      }
    });

    window.addEventListener('focus', () => {
      if (! playing) {
        self.play();
      }
    });

    // add curtains and <video> element to parent
    this.parent.insertBefore(this.video, this.parent.childNodes[0]);
    this.parent.insertBefore(curtains, this.parent.childNodes[0]);

    this.play = function() {
      let button = self.parent.querySelector('button');
      if (button) {
        RMR.Node.remove(button);
      }

      const promise = this.video.play();
      if (promise !== undefined) {
        promise.then(_ => {
        }).catch(error => {
          if (! button) {
            var button = document.createElement('button');
            button.setAttribute('aria-title', 'Play Video');
            this.parent.insertBefore(button, this.parent.firstChild);
            button.addEventListener('click', function() {
              self.video.play();
              RMR.Node.remove(button);
            });
          }
        });
      }    
    };

    /**
     * Begin loading the video
     *
     * @param {Object} sources - optional, string to apply to `src` attribute of the <video> element
     * @return {Object} instance for chaining
     * @chainable
     */
    this.load = function(sources) {

      const videos = arguments.length > 0 ? sources : this.options.sources;

      for (const i in videos) {
        if (! videos.hasOwnProperty(i)) {
          continue;
        }
        const node = document.createElement('source');
        node.setAttribute('type', i);
        node.setAttribute('src', videos[i]);
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
      try {
        if (playing) {
          this.video.pause();
        } else {
          this.video.play();
        }
      } catch (e) {
        //
        console.error(e);
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

    /**
     * Remove video and associated elements from DOM
     *
     */
    this.destroy = function() {
      while (this.parent.childNodes.length > 0) {
        this.parent.removeChild(this.parent.childNodes[0]);
      }
      this.options = this.video = this.parent = null;
    };
  };

  module.exports = Cinema;
})();
