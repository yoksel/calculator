( function ( window ) {

  var $ = tinyLib;

  function define_library() {

    var Calculator = {
      signs: ['*','/','+', '-'],
      firstSigns: ['*','/'],
      secondSigns: ['+','-'],
      parts: [],
      result: 0
    };

    //------------------------------

    Calculator.compute = function ( str ) {

      this.str = str;
      this.strToArr();
      this.handleParts();

      return this.result;
    }

    //------------------------------

    Calculator.strToArr = function () {
      var stack = '';
      var parts = [];

      for (var i = 0; i < this.str.length; i++ ) {
        var item = this.str[i];

        if ( this.signs.indexOf( item ) >= 0 ) {
          parts.push( +stack );
          stack = '';

          parts.push( item );
        }
        else if ( item !== ' ' ) {
          stack += item;
        }
      }
      parts.push( +stack );

      this.parts = parts;
    }

    //------------------------------

    Calculator.handleParts = function () {
      var parts = this.parts;
      var result = 0;

      this.handleBySigns( this.firstSigns );
      this.handleBySigns( this.secondSigns );

      this.result = this.parts[ 0 ];
    }

    //------------------------------

    Calculator.handleBySigns = function ( currentSigns ) {
      var parts = this.parts;

      for (var k = 0; k <= parts.length; k++) {
        var item = parts[k];

        if ( currentSigns.indexOf( item ) >= 0 ) {
          var sign = item;
          var prev = +parts[ k - 1 ];
          var next = +parts[ k + 1 ];
          var mathResult = doMath( sign, prev, next);
          var removeItems = parts.splice(k - 1, 3, mathResult);
          k--;
        }
      }
    }

    //------------------------------

    function doMath( sign, prev, next ) {
      var result = 0;

      if ( sign === '*' ) {
        result = prev * next;
      }
      else if ( sign === '/' ) {
        result = prev / next;
      }
      else if ( sign === '+' ) {
        result = prev + next;
      }
      else if ( sign === '-' ) {
        result = prev - next;
      }

      return result;
    }

    return Calculator;
  }

  //------------------------------

  if ( !window.Calculator ) {
    window.Calculator = define_library();
  }

})( window )
