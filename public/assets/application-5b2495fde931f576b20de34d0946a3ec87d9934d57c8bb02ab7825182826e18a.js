/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */


(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (typeof options.beforeSend === "function") {
          options.beforeSend(xhr, options);
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        } else {
          return fire(document, 'ajaxStop');
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return xhr.abort();
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
;
/*! p5.js v0.4.21 January 18, 2016 */
 !function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.p5=a()}}(function(){var define,module,exports;return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){},{}],2:[function(a,b,c){"use strict";c.argument=function(a,b){if(!a)throw new Error(b)},c.assert=c.argument},{}],3:[function(a,b,c){"use strict";function d(a,b,c,d,e){a.beginPath(),a.moveTo(b,c),a.lineTo(d,e),a.stroke()}c.line=d},{}],4:[function(a,b,c){"use strict";function d(a){this.font=a}function e(a){this.cmap=a}function f(a,b){this.encoding=a,this.charset=b}function g(a){var b;switch(a.version){case 1:this.names=c.standardNames.slice();break;case 2:for(this.names=new Array(a.numberOfGlyphs),b=0;b<a.numberOfGlyphs;b++)a.glyphNameIndex[b]<c.standardNames.length?this.names[b]=c.standardNames[a.glyphNameIndex[b]]:this.names[b]=a.names[a.glyphNameIndex[b]-c.standardNames.length];break;case 2.5:for(this.names=new Array(a.numberOfGlyphs),b=0;b<a.numberOfGlyphs;b++)this.names[b]=c.standardNames[b+a.glyphNameIndex[b]];break;case 3:this.names=[]}}function h(a){for(var b,c=a.tables.cmap.glyphIndexMap,d=Object.keys(c),e=0;e<d.length;e+=1){var f=d[e],g=c[f];b=a.glyphs.get(g),b.addUnicode(parseInt(f))}for(e=0;e<a.glyphs.length;e+=1)b=a.glyphs.get(e),a.cffEncoding?b.name=a.cffEncoding.charset[e]:b.name=a.glyphNames.glyphIndexToName(e)}var i=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","266 ff","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],j=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],k=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],l=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];d.prototype.charToGlyphIndex=function(a){var b=a.charCodeAt(0),c=this.font.glyphs;if(!c)return null;for(var d=0;d<c.length;d+=1)for(var e=c.get(d),f=0;f<e.unicodes.length;f+=1)if(e.unicodes[f]===b)return d},e.prototype.charToGlyphIndex=function(a){return this.cmap.glyphIndexMap[a.charCodeAt(0)]||0},f.prototype.charToGlyphIndex=function(a){var b=a.charCodeAt(0),c=this.encoding[b];return this.charset.indexOf(c)},g.prototype.nameToGlyphIndex=function(a){return this.names.indexOf(a)},g.prototype.glyphIndexToName=function(a){return this.names[a]},c.cffStandardStrings=i,c.cffStandardEncoding=j,c.cffExpertEncoding=k,c.standardNames=l,c.DefaultEncoding=d,c.CmapEncoding=e,c.CffEncoding=f,c.GlyphNames=g,c.addGlyphNames=h},{}],5:[function(a,b,c){"use strict";function d(a){a=a||{},this.names={fontFamily:{en:a.familyName||" "},fontSubfamily:{en:a.styleName||" "},designer:{en:a.designer||" "},designerURL:{en:a.designerURL||" "},manufacturer:{en:a.manufacturer||" "},manufacturerURL:{en:a.manufacturerURL||" "},license:{en:a.license||" "},licenseURL:{en:a.licenseURL||" "},version:{en:a.version||"Version 0.1"},description:{en:a.description||" "},copyright:{en:a.copyright||" "},trademark:{en:a.trademark||" "}},this.unitsPerEm=a.unitsPerEm||1e3,this.ascender=a.ascender,this.descender=a.descender,this.supported=!0,this.glyphs=new h.GlyphSet(this,a.glyphs||[]),this.encoding=new g.DefaultEncoding(this),this.tables={}}var e=a("./path"),f=a("./tables/sfnt"),g=a("./encoding"),h=a("./glyphset");d.prototype.hasChar=function(a){return null!==this.encoding.charToGlyphIndex(a)},d.prototype.charToGlyphIndex=function(a){return this.encoding.charToGlyphIndex(a)},d.prototype.charToGlyph=function(a){var b=this.charToGlyphIndex(a),c=this.glyphs.get(b);return c||(c=this.glyphs.get(0)),c},d.prototype.stringToGlyphs=function(a){for(var b=[],c=0;c<a.length;c+=1){var d=a[c];b.push(this.charToGlyph(d))}return b},d.prototype.nameToGlyphIndex=function(a){return this.glyphNames.nameToGlyphIndex(a)},d.prototype.nameToGlyph=function(a){var b=this.nametoGlyphIndex(a),c=this.glyphs.get(b);return c||(c=this.glyphs.get(0)),c},d.prototype.glyphIndexToName=function(a){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(a):""},d.prototype.getKerningValue=function(a,b){a=a.index||a,b=b.index||b;var c=this.getGposKerningValue;return c?c(a,b):this.kerningPairs[a+","+b]||0},d.prototype.forEachGlyph=function(a,b,c,d,e,f){b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:72,e=e||{};for(var g=void 0===e.kerning?!0:e.kerning,h=1/this.unitsPerEm*d,i=this.stringToGlyphs(a),j=0;j<i.length;j+=1){var k=i[j];if(f(k,b,c,d,e),k.advanceWidth&&(b+=k.advanceWidth*h),g&&j<i.length-1){var l=this.getKerningValue(k,i[j+1]);b+=l*h}}},d.prototype.getPath=function(a,b,c,d,f){var g=new e.Path;return this.forEachGlyph(a,b,c,d,f,function(a,b,c,d){var e=a.getPath(b,c,d);g.extend(e)}),g},d.prototype.draw=function(a,b,c,d,e,f){this.getPath(b,c,d,e,f).draw(a)},d.prototype.drawPoints=function(a,b,c,d,e,f){this.forEachGlyph(b,c,d,e,f,function(b,c,d,e){b.drawPoints(a,c,d,e)})},d.prototype.drawMetrics=function(a,b,c,d,e,f){this.forEachGlyph(b,c,d,e,f,function(b,c,d,e){b.drawMetrics(a,c,d,e)})},d.prototype.getEnglishName=function(a){var b=this.names[a];return b?b.en:void 0},d.prototype.validate=function(){function a(a,b){a||c.push(b)}function b(b){var c=d.getEnglishName(b);a(c&&c.trim().length>0,"No English "+b+" specified.")}var c=[],d=this;b("fontFamily"),b("weightName"),b("manufacturer"),b("copyright"),b("version"),a(this.unitsPerEm>0,"No unitsPerEm specified.")},d.prototype.toTables=function(){return f.fontToTable(this)},d.prototype.toBuffer=function(){for(var a=this.toTables(),b=a.encode(),c=new ArrayBuffer(b.length),d=new Uint8Array(c),e=0;e<b.length;e++)d[e]=b[e];return c},d.prototype.download=function(){var a=this.getEnglishName("fontFamily"),b=this.getEnglishName("fontSubfamily"),c=a.replace(/\s/g,"")+"-"+b+".otf",d=this.toBuffer();window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,window.requestFileSystem(window.TEMPORARY,d.byteLength,function(a){a.root.getFile(c,{create:!0},function(a){a.createWriter(function(b){var c=new DataView(d),e=new Blob([c],{type:"font/opentype"});b.write(e),b.addEventListener("writeend",function(){location.href=a.toURL()},!1)})})},function(a){throw a})},c.Font=d},{"./encoding":4,"./glyphset":7,"./path":10,"./tables/sfnt":27}],6:[function(a,b,c){"use strict";function d(a,b){var c=b||{commands:[]};return{configurable:!0,get:function(){return"function"==typeof c&&(c=c()),c},set:function(a){c=a}}}function e(a){this.bindConstructorValues(a)}var f=a("./check"),g=a("./draw"),h=a("./path");e.prototype.bindConstructorValues=function(a){this.index=a.index||0,this.name=a.name||null,this.unicode=a.unicode||void 0,this.unicodes=a.unicodes||void 0!==a.unicode?[a.unicode]:[],a.xMin&&(this.xMin=a.xMin),a.yMin&&(this.yMin=a.yMin),a.xMax&&(this.xMax=a.xMax),a.yMax&&(this.yMax=a.yMax),a.advanceWidth&&(this.advanceWidth=a.advanceWidth),Object.defineProperty(this,"path",d(this,a.path))},e.prototype.addUnicode=function(a){0===this.unicodes.length&&(this.unicode=a),this.unicodes.push(a)},e.prototype.getPath=function(a,b,c){a=void 0!==a?a:0,b=void 0!==b?b:0,c=void 0!==c?c:72;for(var d=1/this.path.unitsPerEm*c,e=new h.Path,f=this.path.commands,g=0;g<f.length;g+=1){var i=f[g];"M"===i.type?e.moveTo(a+i.x*d,b+-i.y*d):"L"===i.type?e.lineTo(a+i.x*d,b+-i.y*d):"Q"===i.type?e.quadraticCurveTo(a+i.x1*d,b+-i.y1*d,a+i.x*d,b+-i.y*d):"C"===i.type?e.curveTo(a+i.x1*d,b+-i.y1*d,a+i.x2*d,b+-i.y2*d,a+i.x*d,b+-i.y*d):"Z"===i.type&&e.closePath()}return e},e.prototype.getContours=function(){if(void 0===this.points)return[];for(var a=[],b=[],c=0;c<this.points.length;c+=1){var d=this.points[c];b.push(d),d.lastPointOfContour&&(a.push(b),b=[])}return f.argument(0===b.length,"There are still points left in the current contour."),a},e.prototype.getMetrics=function(){for(var a=this.path.commands,b=[],c=[],d=0;d<a.length;d+=1){var e=a[d];"Z"!==e.type&&(b.push(e.x),c.push(e.y)),("Q"===e.type||"C"===e.type)&&(b.push(e.x1),c.push(e.y1)),"C"===e.type&&(b.push(e.x2),c.push(e.y2))}var f={xMin:Math.min.apply(null,b),yMin:Math.min.apply(null,c),xMax:Math.max.apply(null,b),yMax:Math.max.apply(null,c),leftSideBearing:0};return f.rightSideBearing=this.advanceWidth-f.leftSideBearing-(f.xMax-f.xMin),f},e.prototype.draw=function(a,b,c,d){this.getPath(b,c,d).draw(a)},e.prototype.drawPoints=function(a,b,c,d){function e(b,c,d,e){var f=2*Math.PI;a.beginPath();for(var g=0;g<b.length;g+=1)a.moveTo(c+b[g].x*e,d+b[g].y*e),a.arc(c+b[g].x*e,d+b[g].y*e,2,0,f,!1);a.closePath(),a.fill()}b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:24;for(var f=1/this.path.unitsPerEm*d,g=[],h=[],i=this.path,j=0;j<i.commands.length;j+=1){var k=i.commands[j];void 0!==k.x&&g.push({x:k.x,y:-k.y}),void 0!==k.x1&&h.push({x:k.x1,y:-k.y1}),void 0!==k.x2&&h.push({x:k.x2,y:-k.y2})}a.fillStyle="blue",e(g,b,c,f),a.fillStyle="red",e(h,b,c,f)},e.prototype.drawMetrics=function(a,b,c,d){var e;b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:24,e=1/this.path.unitsPerEm*d,a.lineWidth=1,a.strokeStyle="black",g.line(a,b,-1e4,b,1e4),g.line(a,-1e4,c,1e4,c);var f=this.xMin||0,h=this.yMin||0,i=this.xMax||0,j=this.yMax||0,k=this.advanceWidth||0;a.strokeStyle="blue",g.line(a,b+f*e,-1e4,b+f*e,1e4),g.line(a,b+i*e,-1e4,b+i*e,1e4),g.line(a,-1e4,c+-h*e,1e4,c+-h*e),g.line(a,-1e4,c+-j*e,1e4,c+-j*e),a.strokeStyle="green",g.line(a,b+k*e,-1e4,b+k*e,1e4)},c.Glyph=e},{"./check":2,"./draw":3,"./path":10}],7:[function(a,b,c){"use strict";function d(a,b){if(this.font=a,this.glyphs={},Array.isArray(b))for(var c=0;c<b.length;c++)this.glyphs[c]=b[c];this.length=b&&b.length||0}function e(a,b){return new h.Glyph({index:b,font:a})}function f(a,b,c,d,e,f){return function(){var g=new h.Glyph({index:b,font:a});return g.path=function(){c(g,d,e);var b=f(a.glyphs,g);return b.unitsPerEm=a.unitsPerEm,b},g}}function g(a,b,c,d){return function(){var e=new h.Glyph({index:b,font:a});return e.path=function(){var b=c(a,e,d);return b.unitsPerEm=a.unitsPerEm,b},e}}var h=a("./glyph");d.prototype.get=function(a){return"function"==typeof this.glyphs[a]&&(this.glyphs[a]=this.glyphs[a]()),this.glyphs[a]},d.prototype.push=function(a,b){this.glyphs[a]=b,this.length++},c.GlyphSet=d,c.glyphLoader=e,c.ttfGlyphLoader=f,c.cffGlyphLoader=g},{"./glyph":6}],8:[function(a,b,c){"use strict";function d(a){for(var b=new ArrayBuffer(a.length),c=new Uint8Array(b),d=0;d<a.length;d+=1)c[d]=a[d];return b}function e(b,c){var e=a("fs");e.readFile(b,function(a,b){return a?c(a.message):void c(null,d(b))})}function f(a,b){var c=new XMLHttpRequest;c.open("get",a,!0),c.responseType="arraybuffer",c.onload=function(){return 200!==c.status?b("Font could not be loaded: "+c.statusText):b(null,c.response)},c.send()}function g(a){var b,c,d,e,f,g,h,i,l,n,D=new k.Font,E=new DataView(a,0),F=m.getFixed(E,0);if(1===F)D.outlinesFormat="truetype";else{if(F=m.getTag(E,0),"OTTO"!==F)throw new Error("Unsupported OpenType version "+F);D.outlinesFormat="cff"}for(var G=m.getUShort(E,4),H=12,I=0;G>I;I+=1){var J=m.getTag(E,H),K=m.getULong(E,H+8);switch(J){case"cmap":D.tables.cmap=o.parse(E,K),D.encoding=new j.CmapEncoding(D.tables.cmap);break;case"fvar":e=K;break;case"head":D.tables.head=t.parse(E,K),D.unitsPerEm=D.tables.head.unitsPerEm,b=D.tables.head.indexToLocFormat;break;case"hhea":D.tables.hhea=u.parse(E,K),D.ascender=D.tables.hhea.ascender,D.descender=D.tables.hhea.descender,D.numberOfHMetrics=D.tables.hhea.numberOfHMetrics;break;case"hmtx":h=K;break;case"ltag":c=x.parse(E,K);break;case"maxp":D.tables.maxp=z.parse(E,K),D.numGlyphs=D.tables.maxp.numGlyphs;break;case"name":n=K;break;case"OS/2":D.tables.os2=B.parse(E,K);break;case"post":D.tables.post=C.parse(E,K),D.glyphNames=new j.GlyphNames(D.tables.post);break;case"glyf":f=K;break;case"loca":l=K;break;case"CFF ":d=K;break;case"kern":i=K;break;case"GPOS":g=K}H+=16}if(D.tables.name=A.parse(E,n,c),D.names=D.tables.name,f&&l){var L=0===b,M=y.parse(E,l,D.numGlyphs,L);D.glyphs=r.parse(E,f,M,D),v.parse(E,h,D.numberOfHMetrics,D.numGlyphs,D.glyphs),j.addGlyphNames(D)}else{if(!d)throw new Error("Font doesn't contain TrueType or CFF outlines.");p.parse(E,d,D),j.addGlyphNames(D)}return i?D.kerningPairs=w.parse(E,i):D.kerningPairs={},g&&s.parse(E,g,D),e&&(D.tables.fvar=q.parse(E,e,D.names)),D}function h(a,b){var c="undefined"==typeof window,d=c?e:f;d(a,function(a,c){if(a)return b(a);var d=g(c);return b(null,d)})}function i(b){var c=a("fs"),e=c.readFileSync(b);return g(d(e))}var j=a("./encoding"),k=a("./font"),l=a("./glyph"),m=a("./parse"),n=a("./path"),o=a("./tables/cmap"),p=a("./tables/cff"),q=a("./tables/fvar"),r=a("./tables/glyf"),s=a("./tables/gpos"),t=a("./tables/head"),u=a("./tables/hhea"),v=a("./tables/hmtx"),w=a("./tables/kern"),x=a("./tables/ltag"),y=a("./tables/loca"),z=a("./tables/maxp"),A=a("./tables/name"),B=a("./tables/os2"),C=a("./tables/post");c._parse=m,c.Font=k.Font,c.Glyph=l.Glyph,c.Path=n.Path,c.parse=g,c.load=h,c.loadSync=i},{"./encoding":4,"./font":5,"./glyph":6,"./parse":9,"./path":10,"./tables/cff":12,"./tables/cmap":13,"./tables/fvar":14,"./tables/glyf":15,"./tables/gpos":16,"./tables/head":17,"./tables/hhea":18,"./tables/hmtx":19,"./tables/kern":20,"./tables/loca":21,"./tables/ltag":22,"./tables/maxp":23,"./tables/name":24,"./tables/os2":25,"./tables/post":26,fs:1}],9:[function(a,b,c){"use strict";function d(a,b){this.data=a,this.offset=b,this.relativeOffset=0}c.getByte=function(a,b){return a.getUint8(b)},c.getCard8=c.getByte,c.getUShort=function(a,b){return a.getUint16(b,!1)},c.getCard16=c.getUShort,c.getShort=function(a,b){return a.getInt16(b,!1)},c.getULong=function(a,b){return a.getUint32(b,!1)},c.getFixed=function(a,b){var c=a.getInt16(b,!1),d=a.getUint16(b+2,!1);return c+d/65535},c.getTag=function(a,b){for(var c="",d=b;b+4>d;d+=1)c+=String.fromCharCode(a.getInt8(d));return c},c.getOffset=function(a,b,c){for(var d=0,e=0;c>e;e+=1)d<<=8,d+=a.getUint8(b+e);return d},c.getBytes=function(a,b,c){for(var d=[],e=b;c>e;e+=1)d.push(a.getUint8(e));return d},c.bytesToString=function(a){for(var b="",c=0;c<a.length;c+=1)b+=String.fromCharCode(a[c]);return b};var e={"byte":1,uShort:2,"short":2,uLong:4,fixed:4,longDateTime:8,tag:4};d.prototype.parseByte=function(){var a=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,a},d.prototype.parseChar=function(){var a=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,a},d.prototype.parseCard8=d.prototype.parseByte,d.prototype.parseUShort=function(){var a=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,a},d.prototype.parseCard16=d.prototype.parseUShort,d.prototype.parseSID=d.prototype.parseUShort,d.prototype.parseOffset16=d.prototype.parseUShort,d.prototype.parseShort=function(){var a=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,a},d.prototype.parseF2Dot14=function(){var a=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,a},d.prototype.parseULong=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a},d.prototype.parseFixed=function(){var a=c.getFixed(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a},d.prototype.parseOffset16List=d.prototype.parseUShortList=function(a){for(var b=new Array(a),d=this.data,e=this.offset+this.relativeOffset,f=0;a>f;f++)b[f]=c.getUShort(d,e),e+=2;return this.relativeOffset+=2*a,b},d.prototype.parseString=function(a){var b=this.data,c=this.offset+this.relativeOffset,d="";this.relativeOffset+=a;for(var e=0;a>e;e++)d+=String.fromCharCode(b.getUint8(c+e));return d},d.prototype.parseTag=function(){return this.parseString(4)},d.prototype.parseLongDateTime=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset+4);return this.relativeOffset+=8,a},d.prototype.parseFixed=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a/65536},d.prototype.parseVersion=function(){var a=c.getUShort(this.data,this.offset+this.relativeOffset),b=c.getUShort(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,a+b/4096/10},d.prototype.skip=function(a,b){void 0===b&&(b=1),this.relativeOffset+=e[a]*b},c.Parser=d},{}],10:[function(a,b,c){"use strict";function d(){this.commands=[],this.fill="black",this.stroke=null,this.strokeWidth=1}d.prototype.moveTo=function(a,b){this.commands.push({type:"M",x:a,y:b})},d.prototype.lineTo=function(a,b){this.commands.push({type:"L",x:a,y:b})},d.prototype.curveTo=d.prototype.bezierCurveTo=function(a,b,c,d,e,f){this.commands.push({type:"C",x1:a,y1:b,x2:c,y2:d,x:e,y:f})},d.prototype.quadTo=d.prototype.quadraticCurveTo=function(a,b,c,d){this.commands.push({type:"Q",x1:a,y1:b,x:c,y:d})},d.prototype.close=d.prototype.closePath=function(){this.commands.push({type:"Z"})},d.prototype.extend=function(a){a.commands&&(a=a.commands),Array.prototype.push.apply(this.commands,a)},d.prototype.draw=function(a){a.beginPath();for(var b=0;b<this.commands.length;b+=1){var c=this.commands[b];"M"===c.type?a.moveTo(c.x,c.y):"L"===c.type?a.lineTo(c.x,c.y):"C"===c.type?a.bezierCurveTo(c.x1,c.y1,c.x2,c.y2,c.x,c.y):"Q"===c.type?a.quadraticCurveTo(c.x1,c.y1,c.x,c.y):"Z"===c.type&&a.closePath()}this.fill&&(a.fillStyle=this.fill,a.fill()),this.stroke&&(a.strokeStyle=this.stroke,a.lineWidth=this.strokeWidth,a.stroke())},d.prototype.toPathData=function(a){function b(b){return Math.round(b)===b?""+Math.round(b):b.toFixed(a)}function c(){for(var a="",c=0;c<arguments.length;c+=1){var d=arguments[c];d>=0&&c>0&&(a+=" "),a+=b(d)}return a}a=void 0!==a?a:2;for(var d="",e=0;e<this.commands.length;e+=1){var f=this.commands[e];"M"===f.type?d+="M"+c(f.x,f.y):"L"===f.type?d+="L"+c(f.x,f.y):"C"===f.type?d+="C"+c(f.x1,f.y1,f.x2,f.y2,f.x,f.y):"Q"===f.type?d+="Q"+c(f.x1,f.y1,f.x,f.y):"Z"===f.type&&(d+="Z")}return d},d.prototype.toSVG=function(a){var b='<path d="';return b+=this.toPathData(a),b+='"',this.fill&"black"!==this.fill&&(b+=null===this.fill?' fill="none"':' fill="'+this.fill+'"'),this.stroke&&(b+=' stroke="'+this.stroke+'" stroke-width="'+this.strokeWidth+'"'),b+="/>"},c.Path=d},{}],11:[function(a,b,c){"use strict";function d(a,b,c){var d;for(d=0;d<b.length;d+=1){var e=b[d];this[e.name]=e.value}if(this.tableName=a,this.fields=b,c){var f=Object.keys(c);for(d=0;d<f.length;d+=1){var g=f[d],h=c[g];void 0!==this[g]&&(this[g]=h)}}}var e=a("./check"),f=a("./types").encode,g=a("./types").sizeOf;d.prototype.sizeOf=function(){for(var a=0,b=0;b<this.fields.length;b+=1){var c=this.fields[b],d=this[c.name];if(void 0===d&&(d=c.value),"function"==typeof d.sizeOf)a+=d.sizeOf();else{var f=g[c.type];e.assert("function"==typeof f,"Could not find sizeOf function for field"+c.name),a+=f(d)}}return a},d.prototype.encode=function(){return f.TABLE(this)},c.Table=d},{"./check":2,"./types":28}],12:[function(a,b,c){"use strict";function d(a,b){if(a===b)return!0;if(Array.isArray(a)&&Array.isArray(b)){if(a.length!==b.length)return!1;for(var c=0;c<a.length;c+=1)if(!d(a[c],b[c]))return!1;return!0}return!1}function e(a,b,c){var d,e,f,g=[],h=[],i=J.getCard16(a,b);if(0!==i){var j=J.getByte(a,b+2);e=b+(i+1)*j+2;var k=b+3;for(d=0;i+1>d;d+=1)g.push(J.getOffset(a,k,j)),k+=j;f=e+g[i]}else f=b+2;for(d=0;d<g.length-1;d+=1){var l=J.getBytes(a,e+g[d],e+g[d+1]);c&&(l=c(l)),h.push(l)}return{objects:h,startOffset:b,endOffset:f}}function f(a){for(var b="",c=15,d=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"];;){var e=a.parseByte(),f=e>>4,g=15&e;if(f===c)break;if(b+=d[f],g===c)break;b+=d[g]}return parseFloat(b)}function g(a,b){var c,d,e,g;if(28===b)return c=a.parseByte(),d=a.parseByte(),c<<8|d;if(29===b)return c=a.parseByte(),d=a.parseByte(),e=a.parseByte(),g=a.parseByte(),c<<24|d<<16|e<<8|g;if(30===b)return f(a);if(b>=32&&246>=b)return b-139;if(b>=247&&250>=b)return c=a.parseByte(),256*(b-247)+c+108;if(b>=251&&254>=b)return c=a.parseByte(),256*-(b-251)-c-108;throw new Error("Invalid b0 "+b)}function h(a){for(var b={},c=0;c<a.length;c+=1){var d,e=a[c][0],f=a[c][1];if(d=1===f.length?f[0]:f,b.hasOwnProperty(e))throw new Error("Object "+b+" already has key "+e);b[e]=d}return b}function i(a,b,c){b=void 0!==b?b:0;var d=new J.Parser(a,b),e=[],f=[];for(c=void 0!==c?c:a.length;d.relativeOffset<c;){var i=d.parseByte();21>=i?(12===i&&(i=1200+d.parseByte()),e.push([i,f]),f=[]):f.push(g(d,i))}return h(e)}function j(a,b){return b=390>=b?H.cffStandardStrings[b]:a[b-391]}function k(a,b,c){for(var d={},e=0;e<b.length;e+=1){var f=b[e],g=a[f.op];void 0===g&&(g=void 0!==f.value?f.value:null),"SID"===f.type&&(g=j(c,g)),d[f.name]=g}return d}function l(a,b){var c={};return c.formatMajor=J.getCard8(a,b),c.formatMinor=J.getCard8(a,b+1),c.size=J.getCard8(a,b+2),c.offsetSize=J.getCard8(a,b+3),c.startOffset=b,c.endOffset=b+4,c}function m(a,b){var c=i(a,0,a.byteLength);return k(c,M,b)}function n(a,b,c,d){var e=i(a,b,c);return k(e,N,d)}function o(a,b,c,d){var e,f,g,h=new J.Parser(a,b);c-=1;var i=[".notdef"],k=h.parseCard8();if(0===k)for(e=0;c>e;e+=1)f=h.parseSID(),i.push(j(d,f));else if(1===k)for(;i.length<=c;)for(f=h.parseSID(),g=h.parseCard8(),e=0;g>=e;e+=1)i.push(j(d,f)),f+=1;else{if(2!==k)throw new Error("Unknown charset format "+k);for(;i.length<=c;)for(f=h.parseSID(),g=h.parseCard16(),e=0;g>=e;e+=1)i.push(j(d,f)),f+=1}return i}function p(a,b,c){var d,e,f={},g=new J.Parser(a,b),h=g.parseCard8();if(0===h){var i=g.parseCard8();for(d=0;i>d;d+=1)e=g.parseCard8(),
f[e]=d}else{if(1!==h)throw new Error("Unknown encoding format "+h);var j=g.parseCard8();for(e=1,d=0;j>d;d+=1)for(var k=g.parseCard8(),l=g.parseCard8(),m=k;k+l>=m;m+=1)f[m]=e,e+=1}return new H.CffEncoding(f,c)}function q(a,b,c){function d(a,b){p&&k.closePath(),k.moveTo(a,b),p=!0}function e(){var b;b=l.length%2!==0,b&&!n&&(o=l.shift()+a.nominalWidthX),m+=l.length>>1,l.length=0,n=!0}function f(c){for(var s,t,u,v,w,x,y,z,A,B,C,D,E=0;E<c.length;){var F=c[E];switch(E+=1,F){case 1:e();break;case 3:e();break;case 4:l.length>1&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),r+=l.pop(),d(q,r);break;case 5:for(;l.length>0;)q+=l.shift(),r+=l.shift(),k.lineTo(q,r);break;case 6:for(;l.length>0&&(q+=l.shift(),k.lineTo(q,r),0!==l.length);)r+=l.shift(),k.lineTo(q,r);break;case 7:for(;l.length>0&&(r+=l.shift(),k.lineTo(q,r),0!==l.length);)q+=l.shift(),k.lineTo(q,r);break;case 8:for(;l.length>0;)g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);break;case 10:w=l.pop()+a.subrsBias,x=a.subrs[w],x&&f(x);break;case 11:return;case 12:switch(F=c[E],E+=1,F){case 35:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j+l.shift(),A=y+l.shift(),B=z+l.shift(),C=A+l.shift(),D=B+l.shift(),q=C+l.shift(),r=D+l.shift(),l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 34:g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j,A=y+l.shift(),B=j,C=A+l.shift(),D=r,q=C+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 36:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j,A=y+l.shift(),B=j,C=A+l.shift(),D=B+l.shift(),q=C+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 37:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j+l.shift(),A=y+l.shift(),B=z+l.shift(),C=A+l.shift(),D=B+l.shift(),Math.abs(C-q)>Math.abs(D-r)?q=C+l.shift():r=D+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;default:console.log("Glyph "+b.index+": unknown operator 1200"+F),l.length=0}break;case 14:l.length>0&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),p&&(k.closePath(),p=!1);break;case 18:e();break;case 19:case 20:e(),E+=m+7>>3;break;case 21:l.length>2&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),r+=l.pop(),q+=l.pop(),d(q,r);break;case 22:l.length>1&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),q+=l.pop(),d(q,r);break;case 23:e();break;case 24:for(;l.length>2;)g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);q+=l.shift(),r+=l.shift(),k.lineTo(q,r);break;case 25:for(;l.length>6;)q+=l.shift(),r+=l.shift(),k.lineTo(q,r);g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);break;case 26:for(l.length%2&&(q+=l.shift());l.length>0;)g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i,r=j+l.shift(),k.curveTo(g,h,i,j,q,r);break;case 27:for(l.length%2&&(r+=l.shift());l.length>0;)g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j,k.curveTo(g,h,i,j,q,r);break;case 28:s=c[E],t=c[E+1],l.push((s<<24|t<<16)>>16),E+=2;break;case 29:w=l.pop()+a.gsubrsBias,x=a.gsubrs[w],x&&f(x);break;case 30:for(;l.length>0&&(g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r),0!==l.length);)g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),r=j+l.shift(),q=i+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r);break;case 31:for(;l.length>0&&(g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),r=j+l.shift(),q=i+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r),0!==l.length);)g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r);break;default:32>F?console.log("Glyph "+b.index+": unknown operator "+F):247>F?l.push(F-139):251>F?(s=c[E],E+=1,l.push(256*(F-247)+s+108)):255>F?(s=c[E],E+=1,l.push(256*-(F-251)-s-108)):(s=c[E],t=c[E+1],u=c[E+2],v=c[E+3],E+=4,l.push((s<<24|t<<16|u<<8|v)/65536))}}}var g,h,i,j,k=new K.Path,l=[],m=0,n=!1,o=a.defaultWidthX,p=!1,q=0,r=0;return f(c),b.advanceWidth=o,k}function r(a){var b;return b=a.length<1240?107:a.length<33900?1131:32768}function s(a,b,c){c.tables.cff={};var d=l(a,b),f=e(a,d.endOffset,J.bytesToString),g=e(a,f.endOffset),h=e(a,g.endOffset,J.bytesToString),i=e(a,h.endOffset);c.gsubrs=i.objects,c.gsubrsBias=r(c.gsubrs);var j=new DataView(new Uint8Array(g.objects[0]).buffer),k=m(j,h.objects);c.tables.cff.topDict=k;var s=b+k["private"][1],t=n(a,s,k["private"][0],h.objects);if(c.defaultWidthX=t.defaultWidthX,c.nominalWidthX=t.nominalWidthX,0!==t.subrs){var u=s+t.subrs,v=e(a,u);c.subrs=v.objects,c.subrsBias=r(c.subrs)}else c.subrs=[],c.subrsBias=0;var w=e(a,b+k.charStrings);c.nGlyphs=w.objects.length;var x=o(a,b+k.charset,c.nGlyphs,h.objects);0===k.encoding?c.cffEncoding=new H.CffEncoding(H.cffStandardEncoding,x):1===k.encoding?c.cffEncoding=new H.CffEncoding(H.cffExpertEncoding,x):c.cffEncoding=p(a,b+k.encoding,x),c.encoding=c.encoding||c.cffEncoding,c.glyphs=new I.GlyphSet(c);for(var y=0;y<c.nGlyphs;y+=1){var z=w.objects[y];c.glyphs.push(y,I.cffGlyphLoader(c,y,q,z))}}function t(a,b){var c,d=H.cffStandardStrings.indexOf(a);return d>=0&&(c=d),d=b.indexOf(a),d>=0?c=d+H.cffStandardStrings.length:(c=H.cffStandardStrings.length+b.length,b.push(a)),c}function u(){return new L.Table("Header",[{name:"major",type:"Card8",value:1},{name:"minor",type:"Card8",value:0},{name:"hdrSize",type:"Card8",value:4},{name:"major",type:"Card8",value:1}])}function v(a){var b=new L.Table("Name INDEX",[{name:"names",type:"INDEX",value:[]}]);b.names=[];for(var c=0;c<a.length;c+=1)b.names.push({name:"name_"+c,type:"NAME",value:a[c]});return b}function w(a,b,c){for(var e={},f=0;f<a.length;f+=1){var g=a[f],h=b[g.name];void 0===h||d(h,g.value)||("SID"===g.type&&(h=t(h,c)),e[g.op]={name:g.name,type:g.type,value:h})}return e}function x(a,b){var c=new L.Table("Top DICT",[{name:"dict",type:"DICT",value:{}}]);return c.dict=w(M,a,b),c}function y(a){var b=new L.Table("Top DICT INDEX",[{name:"topDicts",type:"INDEX",value:[]}]);return b.topDicts=[{name:"topDict_0",type:"TABLE",value:a}],b}function z(a){var b=new L.Table("String INDEX",[{name:"strings",type:"INDEX",value:[]}]);b.strings=[];for(var c=0;c<a.length;c+=1)b.strings.push({name:"string_"+c,type:"STRING",value:a[c]});return b}function A(){return new L.Table("Global Subr INDEX",[{name:"subrs",type:"INDEX",value:[]}])}function B(a,b){for(var c=new L.Table("Charsets",[{name:"format",type:"Card8",value:0}]),d=0;d<a.length;d+=1){var e=a[d],f=t(e,b);c.fields.push({name:"glyph_"+d,type:"SID",value:f})}return c}function C(a){var b=[],c=a.path;b.push({name:"width",type:"NUMBER",value:a.advanceWidth});for(var d=0,e=0,f=0;f<c.commands.length;f+=1){var g,h,i=c.commands[f];if("Q"===i.type){var j=1/3,k=2/3;i={type:"C",x:i.x,y:i.y,x1:j*d+k*i.x1,y1:j*e+k*i.y1,x2:j*i.x+k*i.x1,y2:j*i.y+k*i.y1}}if("M"===i.type)g=Math.round(i.x-d),h=Math.round(i.y-e),b.push({name:"dx",type:"NUMBER",value:g}),b.push({name:"dy",type:"NUMBER",value:h}),b.push({name:"rmoveto",type:"OP",value:21}),d=Math.round(i.x),e=Math.round(i.y);else if("L"===i.type)g=Math.round(i.x-d),h=Math.round(i.y-e),b.push({name:"dx",type:"NUMBER",value:g}),b.push({name:"dy",type:"NUMBER",value:h}),b.push({name:"rlineto",type:"OP",value:5}),d=Math.round(i.x),e=Math.round(i.y);else if("C"===i.type){var l=Math.round(i.x1-d),m=Math.round(i.y1-e),n=Math.round(i.x2-i.x1),o=Math.round(i.y2-i.y1);g=Math.round(i.x-i.x2),h=Math.round(i.y-i.y2),b.push({name:"dx1",type:"NUMBER",value:l}),b.push({name:"dy1",type:"NUMBER",value:m}),b.push({name:"dx2",type:"NUMBER",value:n}),b.push({name:"dy2",type:"NUMBER",value:o}),b.push({name:"dx",type:"NUMBER",value:g}),b.push({name:"dy",type:"NUMBER",value:h}),b.push({name:"rrcurveto",type:"OP",value:8}),d=Math.round(i.x),e=Math.round(i.y)}}return b.push({name:"endchar",type:"OP",value:14}),b}function D(a){for(var b=new L.Table("CharStrings INDEX",[{name:"charStrings",type:"INDEX",value:[]}]),c=0;c<a.length;c+=1){var d=a.get(c),e=C(d);b.charStrings.push({name:d.name,type:"CHARSTRING",value:e})}return b}function E(a,b){var c=new L.Table("Private DICT",[{name:"dict",type:"DICT",value:{}}]);return c.dict=w(N,a,b),c}function F(a){var b=new L.Table("Private DICT INDEX",[{name:"privateDicts",type:"INDEX",value:[]}]);return b.privateDicts=[{name:"privateDict_0",type:"TABLE",value:a}],b}function G(a,b){for(var c,d=new L.Table("CFF ",[{name:"header",type:"TABLE"},{name:"nameIndex",type:"TABLE"},{name:"topDictIndex",type:"TABLE"},{name:"stringIndex",type:"TABLE"},{name:"globalSubrIndex",type:"TABLE"},{name:"charsets",type:"TABLE"},{name:"charStringsIndex",type:"TABLE"},{name:"privateDictIndex",type:"TABLE"}]),e=1/b.unitsPerEm,f={version:b.version,fullName:b.fullName,familyName:b.familyName,weight:b.weightName,fontMatrix:[e,0,0,e,0,0],charset:999,encoding:0,charStrings:999,"private":[0,999]},g={},h=[],i=1;i<a.length;i+=1)c=a.get(i),h.push(c.name);var j=[];d.header=u(),d.nameIndex=v([b.postScriptName]);var k=x(f,j);d.topDictIndex=y(k),d.globalSubrIndex=A(),d.charsets=B(h,j),d.charStringsIndex=D(a);var l=E(g,j);d.privateDictIndex=F(l),d.stringIndex=z(j);var m=d.header.sizeOf()+d.nameIndex.sizeOf()+d.topDictIndex.sizeOf()+d.stringIndex.sizeOf()+d.globalSubrIndex.sizeOf();return f.charset=m,f.encoding=0,f.charStrings=f.charset+d.charsets.sizeOf(),f["private"][1]=f.charStrings+d.charStringsIndex.sizeOf(),k=x(f,j),d.topDictIndex=y(k),d}var H=a("../encoding"),I=a("../glyphset"),J=a("../parse"),K=a("../path"),L=a("../table"),M=[{name:"version",op:0,type:"SID"},{name:"notice",op:1,type:"SID"},{name:"copyright",op:1200,type:"SID"},{name:"fullName",op:2,type:"SID"},{name:"familyName",op:3,type:"SID"},{name:"weight",op:4,type:"SID"},{name:"isFixedPitch",op:1201,type:"number",value:0},{name:"italicAngle",op:1202,type:"number",value:0},{name:"underlinePosition",op:1203,type:"number",value:-100},{name:"underlineThickness",op:1204,type:"number",value:50},{name:"paintType",op:1205,type:"number",value:0},{name:"charstringType",op:1206,type:"number",value:2},{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"uniqueId",op:13,type:"number"},{name:"fontBBox",op:5,type:["number","number","number","number"],value:[0,0,0,0]},{name:"strokeWidth",op:1208,type:"number",value:0},{name:"xuid",op:14,type:[],value:null},{name:"charset",op:15,type:"offset",value:0},{name:"encoding",op:16,type:"offset",value:0},{name:"charStrings",op:17,type:"offset",value:0},{name:"private",op:18,type:["number","offset"],value:[0,0]}],N=[{name:"subrs",op:19,type:"offset",value:0},{name:"defaultWidthX",op:20,type:"number",value:0},{name:"nominalWidthX",op:21,type:"number",value:0}];c.parse=s,c.make=G},{"../encoding":4,"../glyphset":7,"../parse":9,"../path":10,"../table":11}],13:[function(a,b,c){"use strict";function d(a,b){var c,d={};d.version=i.getUShort(a,b),h.argument(0===d.version,"cmap table version should be 0."),d.numTables=i.getUShort(a,b+2);var e=-1;for(c=0;c<d.numTables;c+=1){var f=i.getUShort(a,b+4+8*c),g=i.getUShort(a,b+4+8*c+2);if(3===f&&(1===g||0===g)){e=i.getULong(a,b+4+8*c+4);break}}if(-1===e)return null;var j=new i.Parser(a,b+e);d.format=j.parseUShort(),h.argument(4===d.format,"Only format 4 cmap tables are supported."),d.length=j.parseUShort(),d.language=j.parseUShort();var k;d.segCount=k=j.parseUShort()>>1,j.skip("uShort",3),d.glyphIndexMap={};var l=new i.Parser(a,b+e+14),m=new i.Parser(a,b+e+16+2*k),n=new i.Parser(a,b+e+16+4*k),o=new i.Parser(a,b+e+16+6*k),p=b+e+16+8*k;for(c=0;k-1>c;c+=1)for(var q,r=l.parseUShort(),s=m.parseUShort(),t=n.parseShort(),u=o.parseUShort(),v=s;r>=v;v+=1)0!==u?(p=o.offset+o.relativeOffset-2,p+=u,p+=2*(v-s),q=i.getUShort(a,p),0!==q&&(q=q+t&65535)):q=v+t&65535,d.glyphIndexMap[v]=q;return d}function e(a,b,c){a.segments.push({end:b,start:b,delta:-(b-c),offset:0})}function f(a){a.segments.push({end:65535,start:65535,delta:1,offset:0})}function g(a){var b,c=new j.Table("cmap",[{name:"version",type:"USHORT",value:0},{name:"numTables",type:"USHORT",value:1},{name:"platformID",type:"USHORT",value:3},{name:"encodingID",type:"USHORT",value:1},{name:"offset",type:"ULONG",value:12},{name:"format",type:"USHORT",value:4},{name:"length",type:"USHORT",value:0},{name:"language",type:"USHORT",value:0},{name:"segCountX2",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);for(c.segments=[],b=0;b<a.length;b+=1){for(var d=a.get(b),g=0;g<d.unicodes.length;g+=1)e(c,d.unicodes[g],b);c.segments=c.segments.sort(function(a,b){return a.start-b.start})}f(c);var h;h=c.segments.length,c.segCountX2=2*h,c.searchRange=2*Math.pow(2,Math.floor(Math.log(h)/Math.log(2))),c.entrySelector=Math.log(c.searchRange/2)/Math.log(2),c.rangeShift=c.segCountX2-c.searchRange;var i=[],k=[],l=[],m=[],n=[];for(b=0;h>b;b+=1){var o=c.segments[b];i=i.concat({name:"end_"+b,type:"USHORT",value:o.end}),k=k.concat({name:"start_"+b,type:"USHORT",value:o.start}),l=l.concat({name:"idDelta_"+b,type:"SHORT",value:o.delta}),m=m.concat({name:"idRangeOffset_"+b,type:"USHORT",value:o.offset}),void 0!==o.glyphId&&(n=n.concat({name:"glyph_"+b,type:"USHORT",value:o.glyphId}))}return c.fields=c.fields.concat(i),c.fields.push({name:"reservedPad",type:"USHORT",value:0}),c.fields=c.fields.concat(k),c.fields=c.fields.concat(l),c.fields=c.fields.concat(m),c.fields=c.fields.concat(n),c.length=14+2*i.length+2+2*k.length+2*l.length+2*m.length+2*n.length,c}var h=a("../check"),i=a("../parse"),j=a("../table");c.parse=d,c.make=g},{"../check":2,"../parse":9,"../table":11}],14:[function(a,b,c){"use strict";function d(a,b){var c=JSON.stringify(a),d=256;for(var e in b){var f=parseInt(e);if(f&&!(256>f)){if(JSON.stringify(b[e])===c)return f;f>=d&&(d=f+1)}}return b[d]=a,d}function e(a,b){var c=d(a.name,b);return new m.Table("fvarAxis",[{name:"tag",type:"TAG",value:a.tag},{name:"minValue",type:"FIXED",value:a.minValue<<16},{name:"defaultValue",type:"FIXED",value:a.defaultValue<<16},{name:"maxValue",type:"FIXED",value:a.maxValue<<16},{name:"flags",type:"USHORT",value:0},{name:"nameID",type:"USHORT",value:c}])}function f(a,b,c){var d={},e=new l.Parser(a,b);return d.tag=e.parseTag(),d.minValue=e.parseFixed(),d.defaultValue=e.parseFixed(),d.maxValue=e.parseFixed(),e.skip("uShort",1),d.name=c[e.parseUShort()]||{},d}function g(a,b,c){for(var e=d(a.name,c),f=[{name:"nameID",type:"USHORT",value:e},{name:"flags",type:"USHORT",value:0}],g=0;g<b.length;++g){var h=b[g].tag;f.push({name:"axis "+h,type:"FIXED",value:a.coordinates[h]<<16})}return new m.Table("fvarInstance",f)}function h(a,b,c,d){var e={},f=new l.Parser(a,b);e.name=d[f.parseUShort()]||{},f.skip("uShort",1),e.coordinates={};for(var g=0;g<c.length;++g)e.coordinates[c[g].tag]=f.parseFixed();return e}function i(a,b){var c=new m.Table("fvar",[{name:"version",type:"ULONG",value:65536},{name:"offsetToData",type:"USHORT",value:0},{name:"countSizePairs",type:"USHORT",value:2},{name:"axisCount",type:"USHORT",value:a.axes.length},{name:"axisSize",type:"USHORT",value:20},{name:"instanceCount",type:"USHORT",value:a.instances.length},{name:"instanceSize",type:"USHORT",value:4+4*a.axes.length}]);c.offsetToData=c.sizeOf();for(var d=0;d<a.axes.length;d++)c.fields.push({name:"axis "+d,type:"TABLE",value:e(a.axes[d],b)});for(var f=0;f<a.instances.length;f++)c.fields.push({name:"instance "+f,type:"TABLE",value:g(a.instances[f],a.axes,b)});return c}function j(a,b,c){var d=new l.Parser(a,b),e=d.parseULong();k.argument(65536===e,"Unsupported fvar table version.");var g=d.parseOffset16();d.skip("uShort",1);for(var i=d.parseUShort(),j=d.parseUShort(),m=d.parseUShort(),n=d.parseUShort(),o=[],p=0;i>p;p++)o.push(f(a,b+g+p*j,c));for(var q=[],r=b+g+i*j,s=0;m>s;s++)q.push(h(a,r+s*n,o,c));return{axes:o,instances:q}}var k=a("../check"),l=a("../parse"),m=a("../table");c.make=i,c.parse=j},{"../check":2,"../parse":9,"../table":11}],15:[function(a,b,c){"use strict";function d(a,b,c,d,e){var f;return(b&d)>0?(f=a.parseByte(),0===(b&e)&&(f=-f),f=c+f):f=(b&e)>0?c:c+a.parseShort(),f}function e(a,b,c){var e=new m.Parser(b,c);a.numberOfContours=e.parseShort(),a.xMin=e.parseShort(),a.yMin=e.parseShort(),a.xMax=e.parseShort(),a.yMax=e.parseShort();var f,g;if(a.numberOfContours>0){var h,i=a.endPointIndices=[];for(h=0;h<a.numberOfContours;h+=1)i.push(e.parseUShort());for(a.instructionLength=e.parseUShort(),a.instructions=[],h=0;h<a.instructionLength;h+=1)a.instructions.push(e.parseByte());var j=i[i.length-1]+1;for(f=[],h=0;j>h;h+=1)if(g=e.parseByte(),f.push(g),(8&g)>0)for(var l=e.parseByte(),n=0;l>n;n+=1)f.push(g),h+=1;if(k.argument(f.length===j,"Bad flags."),i.length>0){var o,p=[];if(j>0){for(h=0;j>h;h+=1)g=f[h],o={},o.onCurve=!!(1&g),o.lastPointOfContour=i.indexOf(h)>=0,p.push(o);var q=0;for(h=0;j>h;h+=1)g=f[h],o=p[h],o.x=d(e,g,q,2,16),q=o.x;var r=0;for(h=0;j>h;h+=1)g=f[h],o=p[h],o.y=d(e,g,r,4,32),r=o.y}a.points=p}else a.points=[]}else if(0===a.numberOfContours)a.points=[];else{a.isComposite=!0,a.points=[],a.components=[];for(var s=!0;s;){f=e.parseUShort();var t={glyphIndex:e.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};(1&f)>0?(t.dx=e.parseShort(),t.dy=e.parseShort()):(t.dx=e.parseChar(),t.dy=e.parseChar()),(8&f)>0?t.xScale=t.yScale=e.parseF2Dot14():(64&f)>0?(t.xScale=e.parseF2Dot14(),t.yScale=e.parseF2Dot14()):(128&f)>0&&(t.xScale=e.parseF2Dot14(),t.scale01=e.parseF2Dot14(),t.scale10=e.parseF2Dot14(),t.yScale=e.parseF2Dot14()),a.components.push(t),s=!!(32&f)}}}function f(a,b){for(var c=[],d=0;d<a.length;d+=1){var e=a[d],f={x:b.xScale*e.x+b.scale01*e.y+b.dx,y:b.scale10*e.x+b.yScale*e.y+b.dy,onCurve:e.onCurve,lastPointOfContour:e.lastPointOfContour};c.push(f)}return c}function g(a){for(var b=[],c=[],d=0;d<a.length;d+=1){var e=a[d];c.push(e),e.lastPointOfContour&&(b.push(c),c=[])}return k.argument(0===c.length,"There are still points left in the current contour."),b}function h(a){var b=new n.Path;if(!a)return b;for(var c=g(a),d=0;d<c.length;d+=1){var e,f,h=c[d],i=h[0],j=h[h.length-1];i.onCurve?(e=null,f=!0):(i=j.onCurve?j:{x:(i.x+j.x)/2,y:(i.y+j.y)/2},e=i,f=!1),b.moveTo(i.x,i.y);for(var k=f?1:0;k<h.length;k+=1){var l=h[k],m=0===k?i:h[k-1];if(m.onCurve&&l.onCurve)b.lineTo(l.x,l.y);else if(m.onCurve&&!l.onCurve)e=l;else if(m.onCurve||l.onCurve){if(m.onCurve||!l.onCurve)throw new Error("Invalid state.");b.quadraticCurveTo(e.x,e.y,l.x,l.y),e=null}else{var o={x:(m.x+l.x)/2,y:(m.y+l.y)/2};b.quadraticCurveTo(m.x,m.y,o.x,o.y),e=l}}i!==j&&(e?b.quadraticCurveTo(e.x,e.y,i.x,i.y):b.lineTo(i.x,i.y))}return b.closePath(),b}function i(a,b){if(b.isComposite)for(var c=0;c<b.components.length;c+=1){var d=b.components[c],e=a.get(d.glyphIndex);if(e.points){var g=f(e.points,d);b.points=b.points.concat(g)}}return h(b.points)}function j(a,b,c,d){var f,g=new l.GlyphSet(d);for(f=0;f<c.length-1;f+=1){var h=c[f],j=c[f+1];h!==j?g.push(f,l.ttfGlyphLoader(d,f,e,a,b+h,i)):g.push(f,l.glyphLoader(d,f))}return g}var k=a("../check"),l=a("../glyphset"),m=a("../parse"),n=a("../path");c.parse=j},{"../check":2,"../glyphset":7,"../parse":9,"../path":10}],16:[function(a,b,c){"use strict";function d(a,b){for(var c=new k.Parser(a,b),d=c.parseUShort(),e=[],f=0;d>f;f++)e[c.parseTag()]={offset:c.parseUShort()};return e}function e(a,b){var c=new k.Parser(a,b),d=c.parseUShort(),e=c.parseUShort();if(1===d)return c.parseUShortList(e);if(2===d){for(var f=[];e--;)for(var g=c.parseUShort(),h=c.parseUShort(),i=c.parseUShort(),j=g;h>=j;j++)f[i++]=j;return f}}function f(a,b){var c=new k.Parser(a,b),d=c.parseUShort();if(1===d){var e=c.parseUShort(),f=c.parseUShort(),g=c.parseUShortList(f);return function(a){return g[a-e]||0}}if(2===d){for(var h=c.parseUShort(),i=[],j=[],l=[],m=0;h>m;m++)i[m]=c.parseUShort(),j[m]=c.parseUShort(),l[m]=c.parseUShort();return function(a){for(var b=0,c=i.length-1;c>b;){var d=b+c+1>>1;a<i[d]?c=d-1:b=d}return i[b]<=a&&a<=j[b]?l[b]||0:0}}}function g(a,b){var c,d,g=new k.Parser(a,b),h=g.parseUShort(),i=g.parseUShort(),j=e(a,b+i),l=g.parseUShort(),m=g.parseUShort();if(4===l&&0===m){var n={};if(1===h){for(var o=g.parseUShort(),p=[],q=g.parseOffset16List(o),r=0;o>r;r++){var s=q[r],t=n[s];if(!t){t={},g.relativeOffset=s;for(var u=g.parseUShort();u--;){var v=g.parseUShort();l&&(c=g.parseShort()),m&&(d=g.parseShort()),t[v]=c}}p[j[r]]=t}return function(a,b){var c=p[a];return c?c[b]:void 0}}if(2===h){for(var w=g.parseUShort(),x=g.parseUShort(),y=g.parseUShort(),z=g.parseUShort(),A=f(a,b+w),B=f(a,b+x),C=[],D=0;y>D;D++)for(var E=C[D]=[],F=0;z>F;F++)l&&(c=g.parseShort()),m&&(d=g.parseShort()),E[F]=c;var G={};for(D=0;D<j.length;D++)G[j[D]]=1;return function(a,b){if(G[a]){var c=A(a),d=B(b),e=C[c];return e?e[d]:void 0}}}}}function h(a,b){var c=new k.Parser(a,b),d=c.parseUShort(),e=c.parseUShort(),f=16&e,h=c.parseUShort(),i=c.parseOffset16List(h),j={lookupType:d,lookupFlag:e,markFilteringSet:f?c.parseUShort():-1};if(2===d){for(var l=[],m=0;h>m;m++)l.push(g(a,b+i[m]));j.getKerningValue=function(a,b){for(var c=l.length;c--;){var d=l[c](a,b);if(void 0!==d)return d}return 0}}return j}function i(a,b,c){var e=new k.Parser(a,b),f=e.parseFixed();j.argument(1===f,"Unsupported GPOS table version."),d(a,b+e.parseUShort()),d(a,b+e.parseUShort());var g=e.parseUShort();e.relativeOffset=g;for(var i=e.parseUShort(),l=e.parseOffset16List(i),m=b+g,n=0;i>n;n++){var o=h(a,m+l[n]);2!==o.lookupType||c.getGposKerningValue||(c.getGposKerningValue=o.getKerningValue)}}var j=a("../check"),k=a("../parse");c.parse=i},{"../check":2,"../parse":9}],17:[function(a,b,c){"use strict";function d(a,b){var c={},d=new g.Parser(a,b);return c.version=d.parseVersion(),c.fontRevision=Math.round(1e3*d.parseFixed())/1e3,c.checkSumAdjustment=d.parseULong(),c.magicNumber=d.parseULong(),f.argument(1594834165===c.magicNumber,"Font header has wrong magic number."),c.flags=d.parseUShort(),c.unitsPerEm=d.parseUShort(),c.created=d.parseLongDateTime(),c.modified=d.parseLongDateTime(),c.xMin=d.parseShort(),c.yMin=d.parseShort(),c.xMax=d.parseShort(),c.yMax=d.parseShort(),c.macStyle=d.parseUShort(),c.lowestRecPPEM=d.parseUShort(),c.fontDirectionHint=d.parseShort(),c.indexToLocFormat=d.parseShort(),c.glyphDataFormat=d.parseShort(),c}function e(a){return new h.Table("head",[{name:"version",type:"FIXED",value:65536},{name:"fontRevision",type:"FIXED",value:65536},{name:"checkSumAdjustment",type:"ULONG",value:0},{name:"magicNumber",type:"ULONG",value:1594834165},{name:"flags",type:"USHORT",value:0},{name:"unitsPerEm",type:"USHORT",value:1e3},{name:"created",type:"LONGDATETIME",value:0},{name:"modified",type:"LONGDATETIME",value:0},{name:"xMin",type:"SHORT",value:0},{name:"yMin",type:"SHORT",value:0},{name:"xMax",type:"SHORT",value:0},{name:"yMax",type:"SHORT",value:0},{name:"macStyle",type:"USHORT",value:0},{name:"lowestRecPPEM",type:"USHORT",value:0},{name:"fontDirectionHint",type:"SHORT",value:2},{name:"indexToLocFormat",type:"SHORT",value:0},{name:"glyphDataFormat",type:"SHORT",value:0}],a)}var f=a("../check"),g=a("../parse"),h=a("../table");c.parse=d,c.make=e},{"../check":2,"../parse":9,"../table":11}],18:[function(a,b,c){"use strict";function d(a,b){var c={},d=new f.Parser(a,b);return c.version=d.parseVersion(),c.ascender=d.parseShort(),c.descender=d.parseShort(),c.lineGap=d.parseShort(),c.advanceWidthMax=d.parseUShort(),c.minLeftSideBearing=d.parseShort(),c.minRightSideBearing=d.parseShort(),c.xMaxExtent=d.parseShort(),c.caretSlopeRise=d.parseShort(),c.caretSlopeRun=d.parseShort(),c.caretOffset=d.parseShort(),d.relativeOffset+=8,c.metricDataFormat=d.parseShort(),c.numberOfHMetrics=d.parseUShort(),c}function e(a){return new g.Table("hhea",[{name:"version",type:"FIXED",value:65536},{name:"ascender",type:"FWORD",value:0},{name:"descender",type:"FWORD",value:0},{name:"lineGap",type:"FWORD",value:0},{name:"advanceWidthMax",type:"UFWORD",value:0},{name:"minLeftSideBearing",type:"FWORD",value:0},{name:"minRightSideBearing",type:"FWORD",value:0},{name:"xMaxExtent",type:"FWORD",value:0},{name:"caretSlopeRise",type:"SHORT",value:1},{name:"caretSlopeRun",type:"SHORT",value:0},{name:"caretOffset",type:"SHORT",value:0},{name:"reserved1",type:"SHORT",value:0},{name:"reserved2",type:"SHORT",value:0},{name:"reserved3",type:"SHORT",value:0},{name:"reserved4",type:"SHORT",value:0},{name:"metricDataFormat",type:"SHORT",value:0},{name:"numberOfHMetrics",type:"USHORT",value:0}],a)}var f=a("../parse"),g=a("../table");c.parse=d,c.make=e},{"../parse":9,"../table":11}],19:[function(a,b,c){"use strict";function d(a,b,c,d,e){for(var g,h,i=new f.Parser(a,b),j=0;d>j;j+=1){c>j&&(g=i.parseUShort(),h=i.parseShort());var k=e.get(j);k.advanceWidth=g,k.leftSideBearing=h}}function e(a){for(var b=new g.Table("hmtx",[]),c=0;c<a.length;c+=1){var d=a.get(c),e=d.advanceWidth||0,f=d.leftSideBearing||0;b.fields.push({name:"advanceWidth_"+c,type:"USHORT",value:e}),b.fields.push({name:"leftSideBearing_"+c,type:"SHORT",value:f})}return b}var f=a("../parse"),g=a("../table");c.parse=d,c.make=e},{"../parse":9,"../table":11}],20:[function(a,b,c){"use strict";function d(a,b){var c={},d=new f.Parser(a,b),g=d.parseUShort();e.argument(0===g,"Unsupported kern table version."),d.skip("uShort",1);var h=d.parseUShort();e.argument(0===h,"Unsupported kern sub-table version."),d.skip("uShort",2);var i=d.parseUShort();d.skip("uShort",3);for(var j=0;i>j;j+=1){var k=d.parseUShort(),l=d.parseUShort(),m=d.parseShort();c[k+","+l]=m}return c}var e=a("../check"),f=a("../parse");c.parse=d},{"../check":2,"../parse":9}],21:[function(a,b,c){"use strict";function d(a,b,c,d){for(var f=new e.Parser(a,b),g=d?f.parseUShort:f.parseULong,h=[],i=0;c+1>i;i+=1){var j=g.call(f);d&&(j*=2),h.push(j)}return h}var e=a("../parse");c.parse=d},{"../parse":9}],22:[function(a,b,c){"use strict";function d(a){for(var b=new h.Table("ltag",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"numTags",type:"ULONG",value:a.length}]),c="",d=12+4*a.length,e=0;e<a.length;++e){var f=c.indexOf(a[e]);0>f&&(f=c.length,c+=a[e]),b.fields.push({name:"offset "+e,type:"USHORT",value:d+f}),b.fields.push({name:"length "+e,type:"USHORT",value:a[e].length})}return b.fields.push({name:"stringPool",type:"CHARARRAY",value:c}),b}function e(a,b){var c=new g.Parser(a,b),d=c.parseULong();f.argument(1===d,"Unsupported ltag table version."),c.skip("uLong",1);for(var e=c.parseULong(),h=[],i=0;e>i;i++){for(var j="",k=b+c.parseUShort(),l=c.parseUShort(),m=k;k+l>m;++m)j+=String.fromCharCode(a.getInt8(m));h.push(j)}return h}var f=a("../check"),g=a("../parse"),h=a("../table");c.make=d,c.parse=e},{"../check":2,"../parse":9,"../table":11}],23:[function(a,b,c){"use strict";function d(a,b){var c={},d=new f.Parser(a,b);return c.version=d.parseVersion(),c.numGlyphs=d.parseUShort(),1===c.version&&(c.maxPoints=d.parseUShort(),c.maxContours=d.parseUShort(),c.maxCompositePoints=d.parseUShort(),c.maxCompositeContours=d.parseUShort(),c.maxZones=d.parseUShort(),c.maxTwilightPoints=d.parseUShort(),c.maxStorage=d.parseUShort(),c.maxFunctionDefs=d.parseUShort(),c.maxInstructionDefs=d.parseUShort(),c.maxStackElements=d.parseUShort(),c.maxSizeOfInstructions=d.parseUShort(),c.maxComponentElements=d.parseUShort(),c.maxComponentDepth=d.parseUShort()),c}function e(a){return new g.Table("maxp",[{name:"version",type:"FIXED",value:20480},{name:"numGlyphs",type:"USHORT",value:a}])}var f=a("../parse"),g=a("../table");c.parse=d,c.make=e},{"../parse":9,"../table":11}],24:[function(a,b,c){"use strict";function d(a,b,c){switch(a){case 0:if(65535===b)return"und";if(c)return c[b];break;case 1:return r[b];case 3:return t[b]}return void 0}function e(a,b,c){switch(a){case 0:return u;case 1:return w[c]||v[b];case 3:if(1===b||10===b)return u}return void 0}function f(a,b,c){for(var f={},g=new o.Parser(a,b),h=g.parseUShort(),i=g.parseUShort(),j=g.offset+g.parseUShort(),k=0;i>k;k++){var l=g.parseUShort(),n=g.parseUShort(),p=g.parseUShort(),r=g.parseUShort(),s=q[r]||r,t=g.parseUShort(),v=g.parseUShort(),w=d(l,p,c),x=e(l,n,p);if(void 0!==x&&void 0!==w){var y;if(y=x===u?m.UTF16(a,j+v,t):m.MACSTRING(a,j+v,t,x)){var z=f[s];void 0===z&&(z=f[s]={}),z[w]=y}}}var A=0;return 1===h&&(A=g.parseUShort()),f}function g(a){var b={};for(var c in a)b[a[c]]=parseInt(c);return b}function h(a,b,c,d,e,f){return new p.Table("NameRecord",[{name:"platformID",type:"USHORT",value:a},{name:"encodingID",type:"USHORT",value:b},{name:"languageID",type:"USHORT",value:c},{name:"nameID",type:"USHORT",value:d},{name:"length",type:"USHORT",value:e},{name:"offset",type:"USHORT",value:f}])}function i(a,b){var c=a.length,d=b.length-c+1;a:for(var e=0;d>e;e++)for(;d>e;e++){for(var f=0;c>f;f++)if(b[e+f]!==a[f])continue a;return e}return-1}function j(a,b){var c=i(a,b);if(0>c){c=b.length;for(var d=0,e=a.length;e>d;++d)b.push(a[d])}return c}function k(a,b){var c,d=[],f={},i=g(q);for(var k in a){var l=i[k];void 0===l&&(l=k),c=parseInt(l),f[c]=a[k],d.push(c)}for(var m=g(r),o=g(t),u=[],v=[],w=0;w<d.length;w++){c=d[w];var x=f[c];for(var y in x){var z=x[y],A=1,B=m[y],C=s[B],D=e(A,C,B),E=n.MACSTRING(z,D);void 0===E&&(A=0,B=b.indexOf(y),0>B&&(B=b.length,b.push(y)),C=4,E=n.UTF16(z));var F=j(E,v);u.push(h(A,C,B,c,E.length,F));var G=o[y];if(void 0!==G){var H=n.UTF16(z),I=j(H,v);u.push(h(3,1,G,c,H.length,I))}}}u.sort(function(a,b){return a.platformID-b.platformID||a.encodingID-b.encodingID||a.languageID-b.languageID||a.nameID-b.nameID});for(var J=new p.Table("name",[{name:"format",type:"USHORT",value:0},{name:"count",type:"USHORT",value:u.length},{name:"stringOffset",type:"USHORT",value:6+12*u.length}]),K=0;K<u.length;K++)J.fields.push({name:"record_"+K,type:"TABLE",value:u[K]});return J.fields.push({name:"strings",type:"LITERAL",value:v}),J}var l=a("../types"),m=l.decode,n=l.encode,o=a("../parse"),p=a("../table"),q=["copyright","fontFamily","fontSubfamily","uniqueID","fullName","version","postScriptName","trademark","manufacturer","designer","description","manufacturerURL","designerURL","licence","licenceURL","reserved","preferredFamily","preferredSubfamily","compatibleFullName","sampleText","postScriptFindFontName","wwsFamily","wwsSubfamily"],r={0:"en",1:"fr",2:"de",3:"it",4:"nl",5:"sv",6:"es",7:"da",8:"pt",9:"no",10:"he",11:"ja",12:"ar",13:"fi",14:"el",15:"is",16:"mt",17:"tr",18:"hr",19:"zh-Hant",20:"ur",21:"hi",22:"th",23:"ko",24:"lt",25:"pl",26:"hu",27:"es",28:"lv",29:"se",30:"fo",31:"fa",32:"ru",33:"zh",34:"nl-BE",35:"ga",36:"sq",37:"ro",38:"cz",39:"sk",40:"si",41:"yi",42:"sr",43:"mk",44:"bg",45:"uk",46:"be",47:"uz",48:"kk",49:"az-Cyrl",50:"az-Arab",51:"hy",52:"ka",53:"mo",54:"ky",55:"tg",56:"tk",57:"mn-CN",58:"mn",59:"ps",60:"ks",61:"ku",62:"sd",63:"bo",64:"ne",65:"sa",66:"mr",67:"bn",68:"as",69:"gu",70:"pa",71:"or",72:"ml",73:"kn",74:"ta",75:"te",76:"si",77:"my",78:"km",79:"lo",80:"vi",81:"id",82:"tl",83:"ms",84:"ms-Arab",85:"am",86:"ti",87:"om",88:"so",89:"sw",90:"rw",91:"rn",92:"ny",93:"mg",94:"eo",128:"cy",129:"eu",130:"ca",131:"la",132:"qu",133:"gn",134:"ay",135:"tt",136:"ug",137:"dz",138:"jv",139:"su",140:"gl",141:"af",142:"br",143:"iu",144:"gd",145:"gv",146:"ga",147:"to",148:"el-polyton",149:"kl",150:"az",151:"nn"},s={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:5,11:1,12:4,13:0,14:6,15:0,16:0,17:0,18:0,19:2,20:4,21:9,22:21,23:3,24:29,25:29,26:29,27:29,28:29,29:0,30:0,31:4,32:7,33:25,34:0,35:0,36:0,37:0,38:29,39:29,40:0,41:5,42:7,43:7,44:7,45:7,46:7,47:7,48:7,49:7,50:4,51:24,52:23,53:7,54:7,55:7,56:7,57:27,58:7,59:4,60:4,61:4,62:4,63:26,64:9,65:9,66:9,67:13,68:13,69:11,70:10,71:12,72:17,73:16,74:14,75:15,76:18,77:19,78:20,79:22,80:30,81:0,82:0,83:0,84:4,85:28,86:28,87:28,88:0,89:0,90:0,91:0,92:0,93:0,94:0,128:0,129:0,130:0,131:0,132:0,133:0,134:0,135:7,136:4,137:26,138:0,139:0,140:0,141:0,142:0,143:28,144:0,145:0,146:0,147:0,148:6,149:0,150:0,151:0},t={1078:"af",1052:"sq",1156:"gsw",1118:"am",5121:"ar-DZ",15361:"ar-BH",3073:"ar",2049:"ar-IQ",11265:"ar-JO",13313:"ar-KW",12289:"ar-LB",4097:"ar-LY",6145:"ary",8193:"ar-OM",16385:"ar-QA",1025:"ar-SA",10241:"ar-SY",7169:"aeb",14337:"ar-AE",9217:"ar-YE",1067:"hy",1101:"as",2092:"az-Cyrl",1068:"az",1133:"ba",1069:"eu",1059:"be",2117:"bn",1093:"bn-IN",
8218:"bs-Cyrl",5146:"bs",1150:"br",1026:"bg",1027:"ca",3076:"zh-HK",5124:"zh-MO",2052:"zh",4100:"zh-SG",1028:"zh-TW",1155:"co",1050:"hr",4122:"hr-BA",1029:"cs",1030:"da",1164:"prs",1125:"dv",2067:"nl-BE",1043:"nl",3081:"en-AU",10249:"en-BZ",4105:"en-CA",9225:"en-029",16393:"en-IN",6153:"en-IE",8201:"en-JM",17417:"en-MY",5129:"en-NZ",13321:"en-PH",18441:"en-SG",7177:"en-ZA",11273:"en-TT",2057:"en-GB",1033:"en",12297:"en-ZW",1061:"et",1080:"fo",1124:"fil",1035:"fi",2060:"fr-BE",3084:"fr-CA",1036:"fr",5132:"fr-LU",6156:"fr-MC",4108:"fr-CH",1122:"fy",1110:"gl",1079:"ka",3079:"de-AT",1031:"de",5127:"de-LI",4103:"de-LU",2055:"de-CH",1032:"el",1135:"kl",1095:"gu",1128:"ha",1037:"he",1081:"hi",1038:"hu",1039:"is",1136:"ig",1057:"id",1117:"iu",2141:"iu-Latn",2108:"ga",1076:"xh",1077:"zu",1040:"it",2064:"it-CH",1041:"ja",1099:"kn",1087:"kk",1107:"km",1158:"quc",1159:"rw",1089:"sw",1111:"kok",1042:"ko",1088:"ky",1108:"lo",1062:"lv",1063:"lt",2094:"dsb",1134:"lb",1071:"mk",2110:"ms-BN",1086:"ms",1100:"ml",1082:"mt",1153:"mi",1146:"arn",1102:"mr",1148:"moh",1104:"mn",2128:"mn-CN",1121:"ne",1044:"nb",2068:"nn",1154:"oc",1096:"or",1123:"ps",1045:"pl",1046:"pt",2070:"pt-PT",1094:"pa",1131:"qu-BO",2155:"qu-EC",3179:"qu",1048:"ro",1047:"rm",1049:"ru",9275:"smn",4155:"smj-NO",5179:"smj",3131:"se-FI",1083:"se",2107:"se-SE",8251:"sms",6203:"sma-NO",7227:"sms",1103:"sa",7194:"sr-Cyrl-BA",3098:"sr",6170:"sr-Latn-BA",2074:"sr-Latn",1132:"nso",1074:"tn",1115:"si",1051:"sk",1060:"sl",11274:"es-AR",16394:"es-BO",13322:"es-CL",9226:"es-CO",5130:"es-CR",7178:"es-DO",12298:"es-EC",17418:"es-SV",4106:"es-GT",18442:"es-HN",2058:"es-MX",19466:"es-NI",6154:"es-PA",15370:"es-PY",10250:"es-PE",20490:"es-PR",3082:"es",1034:"es",21514:"es-US",14346:"es-UY",8202:"es-VE",2077:"sv-FI",1053:"sv",1114:"syr",1064:"tg",2143:"tzm",1097:"ta",1092:"tt",1098:"te",1054:"th",1105:"bo",1055:"tr",1090:"tk",1152:"ug",1058:"uk",1070:"hsb",1056:"ur",2115:"uz-Cyrl",1091:"uz",1066:"vi",1106:"cy",1160:"wo",1157:"sah",1144:"ii",1130:"yo"},u="utf-16",v={0:"macintosh",1:"x-mac-japanese",2:"x-mac-chinesetrad",3:"x-mac-korean",6:"x-mac-greek",7:"x-mac-cyrillic",9:"x-mac-devanagai",10:"x-mac-gurmukhi",11:"x-mac-gujarati",12:"x-mac-oriya",13:"x-mac-bengali",14:"x-mac-tamil",15:"x-mac-telugu",16:"x-mac-kannada",17:"x-mac-malayalam",18:"x-mac-sinhalese",19:"x-mac-burmese",20:"x-mac-khmer",21:"x-mac-thai",22:"x-mac-lao",23:"x-mac-georgian",24:"x-mac-armenian",25:"x-mac-chinesesimp",26:"x-mac-tibetan",27:"x-mac-mongolian",28:"x-mac-ethiopic",29:"x-mac-ce",30:"x-mac-vietnamese",31:"x-mac-extarabic"},w={15:"x-mac-icelandic",17:"x-mac-turkish",18:"x-mac-croatian",24:"x-mac-ce",25:"x-mac-ce",26:"x-mac-ce",27:"x-mac-ce",28:"x-mac-ce",30:"x-mac-icelandic",37:"x-mac-romanian",38:"x-mac-ce",39:"x-mac-ce",40:"x-mac-ce",143:"x-mac-inuit",146:"x-mac-gaelic"};c.parse=f,c.make=k},{"../parse":9,"../table":11,"../types":28}],25:[function(a,b,c){"use strict";function d(a){for(var b=0;b<i.length;b+=1){var c=i[b];if(a>=c.begin&&a<c.end)return b}return-1}function e(a,b){var c={},d=new g.Parser(a,b);c.version=d.parseUShort(),c.xAvgCharWidth=d.parseShort(),c.usWeightClass=d.parseUShort(),c.usWidthClass=d.parseUShort(),c.fsType=d.parseUShort(),c.ySubscriptXSize=d.parseShort(),c.ySubscriptYSize=d.parseShort(),c.ySubscriptXOffset=d.parseShort(),c.ySubscriptYOffset=d.parseShort(),c.ySuperscriptXSize=d.parseShort(),c.ySuperscriptYSize=d.parseShort(),c.ySuperscriptXOffset=d.parseShort(),c.ySuperscriptYOffset=d.parseShort(),c.yStrikeoutSize=d.parseShort(),c.yStrikeoutPosition=d.parseShort(),c.sFamilyClass=d.parseShort(),c.panose=[];for(var e=0;10>e;e++)c.panose[e]=d.parseByte();return c.ulUnicodeRange1=d.parseULong(),c.ulUnicodeRange2=d.parseULong(),c.ulUnicodeRange3=d.parseULong(),c.ulUnicodeRange4=d.parseULong(),c.achVendID=String.fromCharCode(d.parseByte(),d.parseByte(),d.parseByte(),d.parseByte()),c.fsSelection=d.parseUShort(),c.usFirstCharIndex=d.parseUShort(),c.usLastCharIndex=d.parseUShort(),c.sTypoAscender=d.parseShort(),c.sTypoDescender=d.parseShort(),c.sTypoLineGap=d.parseShort(),c.usWinAscent=d.parseUShort(),c.usWinDescent=d.parseUShort(),c.version>=1&&(c.ulCodePageRange1=d.parseULong(),c.ulCodePageRange2=d.parseULong()),c.version>=2&&(c.sxHeight=d.parseShort(),c.sCapHeight=d.parseShort(),c.usDefaultChar=d.parseUShort(),c.usBreakChar=d.parseUShort(),c.usMaxContent=d.parseUShort()),c}function f(a){return new h.Table("OS/2",[{name:"version",type:"USHORT",value:3},{name:"xAvgCharWidth",type:"SHORT",value:0},{name:"usWeightClass",type:"USHORT",value:0},{name:"usWidthClass",type:"USHORT",value:0},{name:"fsType",type:"USHORT",value:0},{name:"ySubscriptXSize",type:"SHORT",value:650},{name:"ySubscriptYSize",type:"SHORT",value:699},{name:"ySubscriptXOffset",type:"SHORT",value:0},{name:"ySubscriptYOffset",type:"SHORT",value:140},{name:"ySuperscriptXSize",type:"SHORT",value:650},{name:"ySuperscriptYSize",type:"SHORT",value:699},{name:"ySuperscriptXOffset",type:"SHORT",value:0},{name:"ySuperscriptYOffset",type:"SHORT",value:479},{name:"yStrikeoutSize",type:"SHORT",value:49},{name:"yStrikeoutPosition",type:"SHORT",value:258},{name:"sFamilyClass",type:"SHORT",value:0},{name:"bFamilyType",type:"BYTE",value:0},{name:"bSerifStyle",type:"BYTE",value:0},{name:"bWeight",type:"BYTE",value:0},{name:"bProportion",type:"BYTE",value:0},{name:"bContrast",type:"BYTE",value:0},{name:"bStrokeVariation",type:"BYTE",value:0},{name:"bArmStyle",type:"BYTE",value:0},{name:"bLetterform",type:"BYTE",value:0},{name:"bMidline",type:"BYTE",value:0},{name:"bXHeight",type:"BYTE",value:0},{name:"ulUnicodeRange1",type:"ULONG",value:0},{name:"ulUnicodeRange2",type:"ULONG",value:0},{name:"ulUnicodeRange3",type:"ULONG",value:0},{name:"ulUnicodeRange4",type:"ULONG",value:0},{name:"achVendID",type:"CHARARRAY",value:"XXXX"},{name:"fsSelection",type:"USHORT",value:0},{name:"usFirstCharIndex",type:"USHORT",value:0},{name:"usLastCharIndex",type:"USHORT",value:0},{name:"sTypoAscender",type:"SHORT",value:0},{name:"sTypoDescender",type:"SHORT",value:0},{name:"sTypoLineGap",type:"SHORT",value:0},{name:"usWinAscent",type:"USHORT",value:0},{name:"usWinDescent",type:"USHORT",value:0},{name:"ulCodePageRange1",type:"ULONG",value:0},{name:"ulCodePageRange2",type:"ULONG",value:0},{name:"sxHeight",type:"SHORT",value:0},{name:"sCapHeight",type:"SHORT",value:0},{name:"usDefaultChar",type:"USHORT",value:0},{name:"usBreakChar",type:"USHORT",value:0},{name:"usMaxContext",type:"USHORT",value:0}],a)}var g=a("../parse"),h=a("../table"),i=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];c.unicodeRanges=i,c.getUnicodeRange=d,c.parse=e,c.make=f},{"../parse":9,"../table":11}],26:[function(a,b,c){"use strict";function d(a,b){var c,d={},e=new g.Parser(a,b);switch(d.version=e.parseVersion(),d.italicAngle=e.parseFixed(),d.underlinePosition=e.parseShort(),d.underlineThickness=e.parseShort(),d.isFixedPitch=e.parseULong(),d.minMemType42=e.parseULong(),d.maxMemType42=e.parseULong(),d.minMemType1=e.parseULong(),d.maxMemType1=e.parseULong(),d.version){case 1:d.names=f.standardNames.slice();break;case 2:for(d.numberOfGlyphs=e.parseUShort(),d.glyphNameIndex=new Array(d.numberOfGlyphs),c=0;c<d.numberOfGlyphs;c++)d.glyphNameIndex[c]=e.parseUShort();for(d.names=[],c=0;c<d.numberOfGlyphs;c++)if(d.glyphNameIndex[c]>=f.standardNames.length){var h=e.parseChar();d.names.push(e.parseString(h))}break;case 2.5:for(d.numberOfGlyphs=e.parseUShort(),d.offset=new Array(d.numberOfGlyphs),c=0;c<d.numberOfGlyphs;c++)d.offset[c]=e.parseChar()}return d}function e(){return new h.Table("post",[{name:"version",type:"FIXED",value:196608},{name:"italicAngle",type:"FIXED",value:0},{name:"underlinePosition",type:"FWORD",value:0},{name:"underlineThickness",type:"FWORD",value:0},{name:"isFixedPitch",type:"ULONG",value:0},{name:"minMemType42",type:"ULONG",value:0},{name:"maxMemType42",type:"ULONG",value:0},{name:"minMemType1",type:"ULONG",value:0},{name:"maxMemType1",type:"ULONG",value:0}])}var f=a("../encoding"),g=a("../parse"),h=a("../table");c.parse=d,c.make=e},{"../encoding":4,"../parse":9,"../table":11}],27:[function(a,b,c){"use strict";function d(a){return Math.log(a)/Math.log(2)|0}function e(a){for(;a.length%4!==0;)a.push(0);for(var b=0,c=0;c<a.length;c+=4)b+=(a[c]<<24)+(a[c+1]<<16)+(a[c+2]<<8)+a[c+3];return b%=Math.pow(2,32)}function f(a,b,c,d){return new l.Table("Table Record",[{name:"tag",type:"TAG",value:void 0!==a?a:""},{name:"checkSum",type:"ULONG",value:void 0!==b?b:0},{name:"offset",type:"ULONG",value:void 0!==c?c:0},{name:"length",type:"ULONG",value:void 0!==d?d:0}])}function g(a){var b=new l.Table("sfnt",[{name:"version",type:"TAG",value:"OTTO"},{name:"numTables",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);b.tables=a,b.numTables=a.length;var c=Math.pow(2,d(b.numTables));b.searchRange=16*c,b.entrySelector=d(c),b.rangeShift=16*b.numTables-b.searchRange;for(var g=[],h=[],i=b.sizeOf()+f().sizeOf()*b.numTables;i%4!==0;)i+=1,h.push({name:"padding",type:"BYTE",value:0});for(var j=0;j<a.length;j+=1){var m=a[j];k.argument(4===m.tableName.length,"Table name"+m.tableName+" is invalid.");var n=m.sizeOf(),o=f(m.tableName,e(m.encode()),i,n);for(g.push({name:o.tag+" Table Record",type:"TABLE",value:o}),h.push({name:m.tableName+" table",type:"TABLE",value:m}),i+=n,k.argument(!isNaN(i),"Something went wrong calculating the offset.");i%4!==0;)i+=1,h.push({name:"padding",type:"BYTE",value:0})}return g.sort(function(a,b){return a.value.tag>b.value.tag?1:-1}),b.fields=b.fields.concat(g),b.fields=b.fields.concat(h),b}function h(a,b,c){for(var d=0;d<b.length;d+=1){var e=a.charToGlyphIndex(b[d]);if(e>0){var f=a.glyphs.get(e);return f.getMetrics()}}return c}function i(a){for(var b=0,c=0;c<a.length;c+=1)b+=a[c];return b/a.length}function j(a){for(var b,c=[],d=[],f=[],j=[],k=[],l=[],w=[],x=0,y=0,z=0,A=0,B=0,C=0;C<a.glyphs.length;C+=1){var D=a.glyphs.get(C),E=0|D.unicode;(b>E||null===b)&&(b=E),E>x&&(x=E);var F=u.getUnicodeRange(E);if(32>F)y|=1<<F;else if(64>F)z|=1<<F-32;else if(96>F)A|=1<<F-64;else{if(!(123>F))throw new Error("Unicode ranges bits > 123 are reserved for internal usage");B|=1<<F-96}if(".notdef"!==D.name){var G=D.getMetrics();c.push(G.xMin),d.push(G.yMin),f.push(G.xMax),j.push(G.yMax),l.push(G.leftSideBearing),w.push(G.rightSideBearing),k.push(D.advanceWidth)}}var H={xMin:Math.min.apply(null,c),yMin:Math.min.apply(null,d),xMax:Math.max.apply(null,f),yMax:Math.max.apply(null,j),advanceWidthMax:Math.max.apply(null,k),advanceWidthAvg:i(k),minLeftSideBearing:Math.min.apply(null,l),maxLeftSideBearing:Math.max.apply(null,l),minRightSideBearing:Math.min.apply(null,w)};H.ascender=void 0!==a.ascender?a.ascender:H.yMax,H.descender=void 0!==a.descender?a.descender:H.yMin;var I=o.make({unitsPerEm:a.unitsPerEm,xMin:H.xMin,yMin:H.yMin,xMax:H.xMax,yMax:H.yMax}),J=p.make({ascender:H.ascender,descender:H.descender,advanceWidthMax:H.advanceWidthMax,minLeftSideBearing:H.minLeftSideBearing,minRightSideBearing:H.minRightSideBearing,xMaxExtent:H.maxLeftSideBearing+(H.xMax-H.xMin),numberOfHMetrics:a.glyphs.length}),K=s.make(a.glyphs.length),L=u.make({xAvgCharWidth:Math.round(H.advanceWidthAvg),usWeightClass:500,usWidthClass:5,usFirstCharIndex:b,usLastCharIndex:x,ulUnicodeRange1:y,ulUnicodeRange2:z,ulUnicodeRange3:A,ulUnicodeRange4:B,sTypoAscender:H.ascender,sTypoDescender:H.descender,sTypoLineGap:0,usWinAscent:H.ascender,usWinDescent:-H.descender,sxHeight:h(a,"xyvw",{yMax:0}).yMax,sCapHeight:h(a,"HIKLEFJMNTZBDPRAGOQSUVWXY",H).yMax,usBreakChar:a.hasChar(" ")?32:0}),M=q.make(a.glyphs),N=m.make(a.glyphs),O=a.getEnglishName("fontFamily"),P=a.getEnglishName("fontSubfamily"),Q=O+" "+P,R=a.getEnglishName("postScriptName");R||(R=O.replace(/\s/g,"")+"-"+P);var S={};for(var T in a.names)S[T]=a.names[T];S.uniqueID||(S.uniqueID={en:a.getEnglishName("manufacturer")+":"+Q}),S.postScriptName||(S.postScriptName={en:R}),S.preferredFamily||(S.preferredFamily=a.names.fontFamily),S.preferredSubfamily||(S.preferredSubfamily=a.names.fontSubfamily);var U=[],V=t.make(S,U),W=U.length>0?r.make(U):void 0,X=v.make(),Y=n.make(a.glyphs,{version:a.getEnglishName("version"),fullName:Q,familyName:O,weightName:P,postScriptName:R,unitsPerEm:a.unitsPerEm}),Z=[I,J,K,L,V,N,X,Y,M];W&&Z.push(W);var $=g(Z),_=$.encode(),aa=e(_),ba=$.fields,ca=!1;for(C=0;C<ba.length;C+=1)if("head table"===ba[C].name){ba[C].value.checkSumAdjustment=2981146554-aa,ca=!0;break}if(!ca)throw new Error("Could not find head table with checkSum to adjust.");return $}var k=a("../check"),l=a("../table"),m=a("./cmap"),n=a("./cff"),o=a("./head"),p=a("./hhea"),q=a("./hmtx"),r=a("./ltag"),s=a("./maxp"),t=a("./name"),u=a("./os2"),v=a("./post");c.computeCheckSum=e,c.make=g,c.fontToTable=j},{"../check":2,"../table":11,"./cff":12,"./cmap":13,"./head":17,"./hhea":18,"./hmtx":19,"./ltag":22,"./maxp":23,"./name":24,"./os2":25,"./post":26}],28:[function(a,b,c){"use strict";function d(a){return function(){return a}}var e=a("./check"),f=32768,g=2147483648,h={},i={},j={};i.BYTE=function(a){return e.argument(a>=0&&255>=a,"Byte value should be between 0 and 255."),[a]},j.BYTE=d(1),i.CHAR=function(a){return[a.charCodeAt(0)]},j.CHAR=d(1),i.CHARARRAY=function(a){for(var b=[],c=0;c<a.length;c+=1)b.push(a.charCodeAt(c));return b},j.CHARARRAY=function(a){return a.length},i.USHORT=function(a){return[a>>8&255,255&a]},j.USHORT=d(2),i.SHORT=function(a){return a>=f&&(a=-(2*f-a)),[a>>8&255,255&a]},j.SHORT=d(2),i.UINT24=function(a){return[a>>16&255,a>>8&255,255&a]},j.UINT24=d(3),i.ULONG=function(a){return[a>>24&255,a>>16&255,a>>8&255,255&a]},j.ULONG=d(4),i.LONG=function(a){return a>=g&&(a=-(2*g-a)),[a>>24&255,a>>16&255,a>>8&255,255&a]},j.LONG=d(4),i.FIXED=i.ULONG,j.FIXED=j.ULONG,i.FWORD=i.SHORT,j.FWORD=j.SHORT,i.UFWORD=i.USHORT,j.UFWORD=j.USHORT,i.LONGDATETIME=function(){return[0,0,0,0,0,0,0,0]},j.LONGDATETIME=d(8),i.TAG=function(a){return e.argument(4===a.length,"Tag should be exactly 4 ASCII characters."),[a.charCodeAt(0),a.charCodeAt(1),a.charCodeAt(2),a.charCodeAt(3)]},j.TAG=d(4),i.Card8=i.BYTE,j.Card8=j.BYTE,i.Card16=i.USHORT,j.Card16=j.USHORT,i.OffSize=i.BYTE,j.OffSize=j.BYTE,i.SID=i.USHORT,j.SID=j.USHORT,i.NUMBER=function(a){return a>=-107&&107>=a?[a+139]:a>=108&&1131>=a?(a-=108,[(a>>8)+247,255&a]):a>=-1131&&-108>=a?(a=-a-108,[(a>>8)+251,255&a]):a>=-32768&&32767>=a?i.NUMBER16(a):i.NUMBER32(a)},j.NUMBER=function(a){return i.NUMBER(a).length},i.NUMBER16=function(a){return[28,a>>8&255,255&a]},j.NUMBER16=d(3),i.NUMBER32=function(a){return[29,a>>24&255,a>>16&255,a>>8&255,255&a]},j.NUMBER32=d(5),i.REAL=function(a){var b=a.toString(),c=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(b);if(c){var d=parseFloat("1e"+((c[2]?+c[2]:0)+c[1].length));b=(Math.round(a*d)/d).toString()}var e,f,g="";for(e=0,f=b.length;f>e;e+=1){var h=b[e];g+="e"===h?"-"===b[++e]?"c":"b":"."===h?"a":"-"===h?"e":h}g+=1&g.length?"f":"ff";var i=[30];for(e=0,f=g.length;f>e;e+=2)i.push(parseInt(g.substr(e,2),16));return i},j.REAL=function(a){return i.REAL(a).length},i.NAME=i.CHARARRAY,j.NAME=j.CHARARRAY,i.STRING=i.CHARARRAY,j.STRING=j.CHARARRAY,h.UTF16=function(a,b,c){for(var d=[],e=c/2,f=0;e>f;f++,b+=2)d[f]=a.getUint16(b);return String.fromCharCode.apply(null,d)},i.UTF16=function(a){for(var b=[],c=0;c<a.length;c+=1){var d=a.charCodeAt(c);b.push(d>>8&255),b.push(255&d)}return b},j.UTF16=function(a){return 2*a.length};var k={"x-mac-croatian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ","x-mac-cyrillic":"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю","x-mac-gaelic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ","x-mac-greek":"Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­","x-mac-icelandic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-inuit":"ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł","x-mac-ce":"ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",macintosh:"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-romanian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-turkish":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ"};h.MACSTRING=function(a,b,c,d){var e=k[d];if(void 0===e)return void 0;for(var f="",g=0;c>g;g++){var h=a.getUint8(b+g);f+=127>=h?String.fromCharCode(h):e[127&h]}return f};var l,m="function"==typeof WeakMap&&new WeakMap,n=function(a){if(!l){l={};for(var b in k)l[b]=new String(b)}var c=l[a];if(void 0===c)return void 0;if(m){var d=m.get(c);if(void 0!==d)return d}var e=k[a];if(void 0===e)return void 0;for(var f={},g=0;g<e.length;g++)f[e.charCodeAt(g)]=g+128;return m&&m.set(c,f),f};i.MACSTRING=function(a,b){var c=n(b);if(void 0===c)return void 0;for(var d=[],e=0;e<a.length;e++){var f=a.charCodeAt(e);if(f>=128&&(f=c[f],void 0===f))return void 0;d.push(f)}return d},j.MACSTRING=function(a,b){var c=i.MACSTRING(a,b);return void 0!==c?c.length:0},i.INDEX=function(a){var b,c=1,d=[c],e=[],f=0;for(b=0;b<a.length;b+=1){var g=i.OBJECT(a[b]);Array.prototype.push.apply(e,g),f+=g.length,c+=g.length,d.push(c)}if(0===e.length)return[0,0];var h=[],j=1+Math.floor(Math.log(f)/Math.log(2))/8|0,k=[void 0,i.BYTE,i.USHORT,i.UINT24,i.ULONG][j];for(b=0;b<d.length;b+=1){var l=k(d[b]);Array.prototype.push.apply(h,l)}return Array.prototype.concat(i.Card16(a.length),i.OffSize(j),h,e)},j.INDEX=function(a){return i.INDEX(a).length},i.DICT=function(a){for(var b=[],c=Object.keys(a),d=c.length,e=0;d>e;e+=1){var f=parseInt(c[e],0),g=a[f];b=b.concat(i.OPERAND(g.value,g.type)),b=b.concat(i.OPERATOR(f))}return b},j.DICT=function(a){return i.DICT(a).length},i.OPERATOR=function(a){return 1200>a?[a]:[12,a-1200]},i.OPERAND=function(a,b){var c=[];if(Array.isArray(b))for(var d=0;d<b.length;d+=1)e.argument(a.length===b.length,"Not enough arguments given for type"+b),c=c.concat(i.OPERAND(a[d],b[d]));else if("SID"===b)c=c.concat(i.NUMBER(a));else if("offset"===b)c=c.concat(i.NUMBER32(a));else if("number"===b)c=c.concat(i.NUMBER(a));else{if("real"!==b)throw new Error("Unknown operand type "+b);c=c.concat(i.REAL(a))}return c},i.OP=i.BYTE,j.OP=j.BYTE;var o="function"==typeof WeakMap&&new WeakMap;i.CHARSTRING=function(a){if(o){var b=o.get(a);if(void 0!==b)return b}for(var c=[],d=a.length,e=0;d>e;e+=1){var f=a[e];c=c.concat(i[f.type](f.value))}return o&&o.set(a,c),c},j.CHARSTRING=function(a){return i.CHARSTRING(a).length},i.OBJECT=function(a){var b=i[a.type];return e.argument(void 0!==b,"No encoding function for type "+a.type),b(a.value)},j.OBJECT=function(a){var b=j[a.type];return e.argument(void 0!==b,"No sizeOf function for type "+a.type),b(a.value)},i.TABLE=function(a){for(var b=[],c=a.fields.length,d=0;c>d;d+=1){var f=a.fields[d],g=i[f.type];e.argument(void 0!==g,"No encoding function for field type "+f.type);var h=a[f.name];void 0===h&&(h=f.value);var j=g(h);b=b.concat(j)}return b},j.TABLE=function(a){for(var b=0,c=a.fields.length,d=0;c>d;d+=1){var f=a.fields[d],g=j[f.type];e.argument(void 0!==g,"No sizeOf function for field type "+f.type);var h=a[f.name];void 0===h&&(h=f.value),b+=g(h)}return b},i.LITERAL=function(a){return a},j.LITERAL=function(a){return a.length},c.decode=h,c.encode=i,c.sizeOf=j},{"./check":2}],29:[function(_dereq_,module,exports){!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():"function"==typeof define&&define.amd?define(c):b[a]=c()}("reqwest",this,function(){function succeed(a){var b=protocolRe.exec(a.url);return b=b&&b[1]||window.location.protocol,httpsRe.test(b)?twoHundo.test(a.request.status):!!a.request.response}function handleReadyState(a,b,c){return function(){return a._aborted?c(a.request):a._timedOut?c(a.request,"Request is aborted: timeout"):void(a.request&&4==a.request[readyState]&&(a.request.onreadystatechange=noop,succeed(a)?b(a.request):c(a.request)))}}function setHeaders(a,b){var c,d=b.headers||{};d.Accept=d.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept["*"];var e="function"==typeof FormData&&b.data instanceof FormData;b.crossOrigin||d[requestedWith]||(d[requestedWith]=defaultHeaders.requestedWith),d[contentType]||e||(d[contentType]=b.contentType||defaultHeaders.contentType);for(c in d)d.hasOwnProperty(c)&&"setRequestHeader"in a&&a.setRequestHeader(c,d[c])}function setCredentials(a,b){"undefined"!=typeof b.withCredentials&&"undefined"!=typeof a.withCredentials&&(a.withCredentials=!!b.withCredentials)}function generalCallback(a){lastValue=a}function urlappend(a,b){return a+(/\?/.test(a)?"&":"?")+b}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||reqwest.getcallbackPrefix(e),h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0,l=-1!==navigator.userAgent.indexOf("MSIE 10.0");return i?"?"===i[3]?d=d.replace(h,"$1="+g):g=i[3]:d=urlappend(d,f+"="+g),win[g]=generalCallback,j.type="text/javascript",j.src=d,j.async=!0,"undefined"==typeof j.onreadystatechange||l||(j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){return j[readyState]&&"complete"!==j[readyState]&&"loaded"!==j[readyState]||k?!1:(j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),b(lastValue),lastValue=void 0,head.removeChild(j),void(k=1))},head.appendChild(j),{abort:function(){j.onload=j.onreadystatechange=null,c({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(j),k=1}}}function getRequest(a,b){var c,d=this.o,e=(d.method||"GET").toUpperCase(),f="string"==typeof d?d:d.url,g=d.processData!==!1&&d.data&&"string"!=typeof d.data?reqwest.toQueryString(d.data):d.data||null,h=!1;return"jsonp"!=d.type&&"GET"!=e||!g||(f=urlappend(f,g),g=null),"jsonp"==d.type?handleJsonp(d,a,b,f):(c=d.xhr&&d.xhr(d)||xhr(d),c.open(e,f,d.async===!1?!1:!0),setHeaders(c,d),setCredentials(c,d),win[xDomainRequest]&&c instanceof win[xDomainRequest]?(c.onload=a,c.onerror=b,c.onprogress=function(){},h=!0):c.onreadystatechange=handleReadyState(this,a,b),d.before&&d.before(c),h?setTimeout(function(){c.send(g)},200):c.send(g),c)}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function setType(a){return a.match("json")?"json":a.match("javascript")?"js":a.match("text")?"html":a.match("xml")?"xml":void 0}function init(o,fn){function complete(a){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(a)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(a,b,c){for(a=self.request,self._responseArgs.resp=a,self._responseArgs.msg=b,self._responseArgs.t=c,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(a,b,c);complete(a)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(a,b){return new Reqwest(a,b)}function normalize(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function serial(a,b){var c,d,e,f,g=a.name,h=a.tagName.toLowerCase(),i=function(a){a&&!a.disabled&&b(g,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text))};if(!a.disabled&&g)switch(h){case"input":/reset|button|image|file/i.test(a.type)||(c=/checkbox/i.test(a.type),d=/radio/i.test(a.type),e=a.value,(!(c||d)||a.checked)&&b(g,normalize(c&&""===e?"on":e)));break;case"textarea":b(g,normalize(a.value));break;case"select":if("select-one"===a.type.toLowerCase())i(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(f=0;a.length&&f<a.length;f++)a.options[f].selected&&i(a.options[f])}}function eachFormElement(){var a,b,c=this,d=function(a,b){var d,e,f;for(d=0;d<b.length;d++)for(f=a[byTag](b[d]),e=0;e<f.length;e++)serial(f[e],c)};for(b=0;b<arguments.length;b++)a=arguments[b],/input|select|textarea/i.test(a.tagName)&&serial(a,c),d(a,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments),a}function buildParams(a,b,c,d){var e,f,g,h=/\[\]$/;if(isArray(b))for(f=0;b&&f<b.length;f++)g=b[f],c||h.test(a)?d(a,g):buildParams(a+"["+("object"==typeof g?f:"")+"]",g,c,d);else if(b&&"[object Object]"===b.toString())for(e in b)buildParams(a+"["+e+"]",b[e],c,d);else d(a,b)}var win=window,doc=document,httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(a){return a instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(a){if(a.crossOrigin===!0){var b=win[xmlHttpRequest]?new XMLHttpRequest:null;if(b&&"withCredentials"in b)return b;if(win[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return win[xmlHttpRequest]?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(a){return a}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(a,b){return a=a||function(){},b=b||function(){},this._fulfilled?this._responseArgs.resp=a(this._responseArgs.resp):this._erred?b(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(a),this._errorHandlers.push(b)),this},always:function(a){return this._fulfilled||this._erred?a(this._responseArgs.resp):this._completeHandlers.push(a),this},fail:function(a){return this._erred?a(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(a),this},"catch":function(a){return this.fail(a)}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c})},arguments),a},reqwest.serialize=function(){if(0===arguments.length)return"";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),b="map"==a?serializeHash:"array"==a?reqwest.serializeArray:serializeQueryString,b.apply(null,c)},reqwest.toQueryString=function(a,b){var c,d,e=b||!1,f=[],g=encodeURIComponent,h=function(a,b){b="function"==typeof b?b():null==b?"":b,f[f.length]=g(a)+"="+g(b)};if(isArray(a))for(d=0;a&&d<a.length;d++)h(a[d].name,a[d].value);else for(c in a)a.hasOwnProperty(c)&&buildParams(c,a[c],e,h);return f.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b)},reqwest.ajaxSetup=function(a){a=a||{};for(var b in a)globalSetupOptions[b]=a[b];
},reqwest})},{}],30:[function(a,b,c){"use strict";var d=a("../core/core");a("./p5.Geometry3D"),d.prototype.plane=function(a,b){a=a||50,b=b||50;var c=typeof arguments[2]===Number?arguments[2]:1,e=typeof arguments[3]===Number?arguments[3]:1,f="plane|"+a+"|"+b+"|"+c+"|"+e;if(!this._renderer.geometryInHash(f)){var g=new d.Geometry3D,h=function(c,e){var f=2*a*c-a,g=2*b*e-b,h=0;return new d.Vector(f,g,h)};g.parametricGeometry(h,c,e);var i=g.generateObj();this._renderer.initBuffer(f,[i])}this._renderer.drawBuffer(f)},d.prototype.sphere=function(a,b){a=a||50;var c=b||24,e=b||16,f="sphere|"+a+"|"+c+"|"+e;if(!this._renderer.geometryInHash(f)){var g=new d.Geometry3D,h=function(b,c){var e=2*Math.PI*b,f=Math.PI*c-Math.PI/2,g=a*Math.cos(f)*Math.sin(e),h=a*Math.sin(f),i=a*Math.cos(f)*Math.cos(e);return new d.Vector(g,h,i)};g.parametricGeometry(h,c,e);var i=g.generateObj(!0,!0);this._renderer.initBuffer(f,[i])}return this._renderer.drawBuffer(f),this},d.prototype.ellipsoid=function(a,b,c,e){a=a||50,b=b||50,c=c||50;var f=e||24,g=e||24,h="ellipsoid|"+a+"|"+b+"|"+c+"|"+f+"|"+g;if(!this._renderer.geometryInHash(h)){var i=new d.Geometry3D,j=function(e,f){var g=2*Math.PI*e,h=Math.PI*f-Math.PI/2,i=a*Math.cos(h)*Math.sin(g),j=b*Math.sin(h),k=c*Math.cos(h)*Math.cos(g);return new d.Vector(i,j,k)};i.parametricGeometry(j,f,g);var k=i.generateObj(!0,!0);this._renderer.initBuffer(h,[k])}return this._renderer.drawBuffer(h),this},d.prototype.cylinder=function(a,b,c){a=a||50,b=b||50;var e=c||24,f=c||16,g="cylinder|"+a+"|"+b+"|"+e+"|"+f;if(!this._renderer.geometryInHash(g)){var h=new d.Geometry3D,i=function(c,e){var f=2*Math.PI*c,g=a*Math.sin(f),h=2*b*e-b,i=a*Math.cos(f);return new d.Vector(g,h,i)};h.parametricGeometry(i,e,f);var j=h.generateObj(!0),k=function(c,e){var f=2*Math.PI*c,g=a*Math.sin(-f),h=b,i=a*Math.cos(f);return 0===e?new d.Vector(0,b,0):new d.Vector(g,h,i)},l=new d.Geometry3D;l.parametricGeometry(k,e,1);var m=l.generateObj(),n=function(c,e){var f=2*Math.PI*c,g=a*Math.sin(f),h=-b,i=a*Math.cos(f);return 0===e?new d.Vector(0,-b,0):new d.Vector(g,h,i)},o=new d.Geometry3D;o.parametricGeometry(n,e,1);var p=o.generateObj();this._renderer.initBuffer(g,[j,m,p])}return this._renderer.drawBuffer(g),this},d.prototype.cone=function(a,b,c){a=a||50,b=b||50;var e=c||24,f=c||16,g="cone|"+a+"|"+b+"|"+e+"|"+f;if(!this._renderer.geometryInHash(g)){var h=new d.Geometry3D,i=function(c,e){var f=2*Math.PI*c,g=a*(1-e)*Math.sin(f),h=2*b*e-b,i=a*(1-e)*Math.cos(f);return new d.Vector(g,h,i)};h.parametricGeometry(i,e,f);var j=h.generateObj(!0),k=new d.Geometry3D,l=function(c,e){var f=2*Math.PI*c,g=a*(1-e)*Math.sin(-f),h=-b,i=a*(1-e)*Math.cos(f);return new d.Vector(g,h,i)};k.parametricGeometry(l,e,1);var m=k.generateObj();this._renderer.initBuffer(g,[j,m])}return this._renderer.drawBuffer(g),this},d.prototype.torus=function(a,b,c){a=a||50,b=b||10;var e=c||24,f=c||16,g="torus|"+a+"|"+b+"|"+e+"|"+f;if(!this._renderer.geometryInHash(g)){var h=new d.Geometry3D,i=function(c,e){var f=2*Math.PI*c,g=2*Math.PI*e,h=(a+b*Math.cos(g))*Math.cos(f),i=(a+b*Math.cos(g))*Math.sin(f),j=b*Math.sin(g);return new d.Vector(h,i,j)};h.parametricGeometry(i,e,f);var j=h.generateObj(!0);this._renderer.initBuffer(g,[j])}return this._renderer.drawBuffer(g),this},d.prototype.box=function(a,b,c){a=a||50,b=b||a,c=c||a;var e=typeof arguments[3]===Number?arguments[3]:1,f=typeof arguments[4]===Number?arguments[4]:1,g="cube|"+a+"|"+b+"|"+c+"|"+e+"|"+f;if(!this._renderer.geometryInHash(g)){var h=new d.Geometry3D,i=function(e,f){var g=2*a*e-a,h=2*b*f-b,i=c;return new d.Vector(g,h,i)},j=function(e,f){var g=2*a*(1-e)-a,h=2*b*f-b,i=-c;return new d.Vector(g,h,i)},k=function(e,f){var g=2*a*(1-e)-a,h=b,i=2*c*f-c;return new d.Vector(g,h,i)},l=function(e,f){var g=2*a*e-a,h=-b,i=2*c*f-c;return new d.Vector(g,h,i)},m=function(e,f){var g=a,h=2*b*e-b,i=2*c*f-c;return new d.Vector(g,h,i)},n=function(e,f){var g=-a,h=2*b*(1-e)-b,i=2*c*f-c;return new d.Vector(g,h,i)};h.parametricGeometry(i,e,f,h.vertices.length),h.parametricGeometry(j,e,f,h.vertices.length),h.parametricGeometry(k,e,f,h.vertices.length),h.parametricGeometry(l,e,f,h.vertices.length),h.parametricGeometry(m,e,f,h.vertices.length),h.parametricGeometry(n,e,f,h.vertices.length);var o=h.generateObj();this._renderer.initBuffer(g,[o])}return this._renderer.drawBuffer(g),this},b.exports=d},{"../core/core":50,"./p5.Geometry3D":36}],31:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.camera=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e)d[e]=arguments[e];this._validateParameters("camera",d,["Number","Number","Number"]),this._renderer.translate(-a,-b,-c)},d.prototype.perspective=function(a,b,c,e){for(var f=new Array(arguments.length),g=0;g<f.length;++g)f[g]=arguments[g];this._validateParameters("perspective",f,["Number","Number","Number","Number"]),this._renderer.uPMatrix=d.Matrix.identity(),this._renderer.uPMatrix.perspective(a,b,c,e),this._renderer._setCamera=!0},d.prototype.ortho=function(a,b,c,e,f,g){for(var h=new Array(arguments.length),i=0;i<h.length;++i)h[i]=arguments[i];this._validateParameters("ortho",h,["Number","Number","Number","Number","Number","Number"]),a/=this.width,b/=this.width,e/=this.height,c/=this.height,this._renderer.uPMatrix=d.Matrix.identity(),this._renderer.uPMatrix.ortho(a,b,c,e,f,g),this._renderer._setCamera=!0},b.exports=d},{"../core/core":50}],32:[function(a,b,c){"use strict";var d=a("../core/core");d.Renderer3D.prototype._primitives2D=function(a){this._setDefaultCamera();var b=this.GL,c=this._getColorVertexShader(),d=this.verticeBuffer;b.bindBuffer(b.ARRAY_BUFFER,d),b.bufferData(b.ARRAY_BUFFER,new Float32Array(a),b.STATIC_DRAW),b.vertexAttribPointer(c.vertexPositionAttribute,3,b.FLOAT,!1,0,0);var e=this.colorBuffer;b.bindBuffer(b.ARRAY_BUFFER,e);for(var f=this._getCurColor(),g=[],h=0;h<a.length/3;h++)g=g.concat(f);b.bufferData(b.ARRAY_BUFFER,new Float32Array(g),b.STATIC_DRAW),b.vertexAttribPointer(c.vertexColorAttribute,4,b.FLOAT,!1,0,0);var i="vertexColorVert|vertexColorFrag";this.setMatrixUniforms(i)},d.Renderer3D.prototype.point=function(a,b,c){var d=this.GL;return this._primitives2D([a,b,c]),d.drawArrays(d.POINTS,0,1),this},d.Renderer3D.prototype.line=function(a,b,c,d,e,f){var g=this.GL;return this._primitives2D([a,b,c,d,e,f]),g.drawArrays(g.LINES,0,2),this},d.Renderer3D.prototype.triangle=function(a,b,c,d,e,f,g,h,i){var j=this.GL;return this._primitives2D([a,b,c,d,e,f,g,h,i]),this._strokeCheck(),j.drawArrays(j.TRIANGLES,0,3),this},d.Renderer3D.prototype.quad=function(a,b,c,d,e,f,g,h,i,j,k,l){var m=this.GL;return this._primitives2D([a,b,c,d,e,f,g,h,i,j,k,l]),this._strokeCheck(),m.drawArrays(m.TRIANGLE_STRIP,0,4),this},d.Renderer3D.prototype.beginShape=function(a){return this.shapeMode=a,this.verticeStack=[],this},d.Renderer3D.prototype.vertex=function(a,b,c){return this.verticeStack.push(a,b,c),this},d.Renderer3D.prototype.endShape=function(){var a=this.GL;switch(this._primitives2D(this.verticeStack),this.verticeStack=[],this.shapeMode){case"POINTS":a.drawArrays(a.POINTS,0,1);break;case"LINES":a.drawArrays(a.LINES,0,2);break;case"TRIANGLES":this._strokeCheck(),a.drawArrays(a.TRIANGLES,0,3);break;case"TRIANGLE_STRIP":this._strokeCheck(),a.drawArrays(a.TRIANGLE_STRIP,0,4);break;default:this._strokeCheck(),a.drawArrays(a.TRIANGLES,0,3)}return this},d.Renderer3D.prototype._strokeCheck=function(){if("stroke"===this.drawMode)throw new Error("stroke for shapes in 3D not yet implemented, use fill for now :(")},d.Renderer3D.prototype.strokeWeight=function(){throw new Error("strokeWeight for 3d not yet implemented")},d.Renderer3D.prototype.fill=function(a,b,c,d){var e=this._pInst.color.apply(this._pInst,arguments),f=e._array;return this.curColor=f,this.drawMode="fill",this},d.Renderer3D.prototype.stroke=function(a,b,c,d){var e=this._pInst.color.apply(this._pInst,arguments),f=e._array;return this.curColor=f,this.drawMode="stroke",this},d.Renderer3D.prototype._getColorVertexShader=function(){var a,b=this.GL,c="vertexColorVert|vertexColorFrag";return this.materialInHash(c)?a=this.mHash[c]:(a=this.initShaders("vertexColorVert","vertexColorFrag",!0),this.mHash[c]=a,a.vertexColorAttribute=b.getAttribLocation(a,"aVertexColor"),b.enableVertexAttribArray(a.vertexColorAttribute)),a},b.exports=d.Renderer3D},{"../core/core":50}],33:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.orbitControl=function(){return this.mouseIsPressed&&(this.rotateY((this.mouseX-this.width/2)/(this.width/2)),this.rotateX((this.mouseY-this.height/2)/(this.width/2))),this},b.exports=d},{"../core/core":50}],34:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.ambientLight=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader("lightVert","lightTextureFrag");e.useProgram(f),f.uAmbientColor=e.getUniformLocation(f,"uAmbientColor["+this._renderer.ambientLightCount+"]");var g=this._renderer._pInst.color.apply(this._renderer._pInst,arguments),h=g._array;return e.uniform3f(f.uAmbientColor,h[0],h[1],h[2]),f.uMaterialColor=e.getUniformLocation(f,"uMaterialColor"),e.uniform4f(f.uMaterialColor,1,1,1,1),this._renderer.ambientLightCount++,f.uAmbientLightCount=e.getUniformLocation(f,"uAmbientLightCount"),e.uniform1i(f.uAmbientLightCount,this._renderer.ambientLightCount),this},d.prototype.directionalLight=function(a,b,c,d,e,f,g){var h=this._renderer.GL,i=this._renderer._getShader("lightVert","lightTextureFrag");h.useProgram(i),i.uDirectionalColor=h.getUniformLocation(i,"uDirectionalColor["+this._renderer.directionalLightCount+"]");var j=this._renderer._pInst.color.apply(this._renderer._pInst,[a,b,c]),k=j._array;h.uniform3f(i.uDirectionalColor,k[0],k[1],k[2]);var l,m,n;if("number"==typeof arguments[arguments.length-1])l=arguments[arguments.length-3],m=arguments[arguments.length-2],n=arguments[arguments.length-1];else try{l=arguments[arguments.length-1].x,m=arguments[arguments.length-1].y,n=arguments[arguments.length-1].z}catch(o){throw o}return i.uLightingDirection=h.getUniformLocation(i,"uLightingDirection["+this._renderer.directionalLightCount+"]"),h.uniform3f(i.uLightingDirection,l,m,n),i.uMaterialColor=h.getUniformLocation(i,"uMaterialColor"),h.uniform4f(i.uMaterialColor,1,1,1,1),this._renderer.directionalLightCount++,i.uDirectionalLightCount=h.getUniformLocation(i,"uDirectionalLightCount"),h.uniform1i(i.uDirectionalLightCount,this._renderer.directionalLightCount),this},d.prototype.pointLight=function(a,b,c,d,e,f,g){var h=this._renderer.GL,i=this._renderer._getShader("lightVert","lightTextureFrag");h.useProgram(i),i.uPointLightColor=h.getUniformLocation(i,"uPointLightColor["+this._renderer.pointLightCount+"]");var j=this._renderer._pInst.color.apply(this._renderer._pInst,[a,b,c]),k=j._array;h.uniform3f(i.uPointLightColor,k[0],k[1],k[2]);var l,m,n;if("number"==typeof arguments[arguments.length-1])l=arguments[arguments.length-3],m=arguments[arguments.length-2],n=arguments[arguments.length-1];else try{l=arguments[arguments.length-1].x,m=arguments[arguments.length-1].y,n=arguments[arguments.length-1].z}catch(o){throw o}return i.uPointLightLocation=h.getUniformLocation(i,"uPointLightLocation["+this._renderer.pointLightCount+"]"),h.uniform3f(i.uPointLightLocation,l,m,n),i.uMaterialColor=h.getUniformLocation(i,"uMaterialColor"),h.uniform4f(i.uMaterialColor,1,1,1,1),this._renderer.pointLightCount++,i.uPointLightCount=h.getUniformLocation(i,"uPointLightCount"),h.uniform1i(i.uPointLightCount,this._renderer.pointLightCount),this},b.exports=d},{"../core/core":50}],35:[function(a,b,c){"use strict";function d(a){return 0===(a&a-1)}var e=a("../core/core");e.prototype.normalMaterial=function(){return this._renderer._getShader("normalVert","normalFrag"),this},e.prototype.texture=function(a){var b=this._renderer.GL,c=this._renderer._getShader("lightVert","lightTextureFrag");if(b.useProgram(c),a instanceof e.Image){if(!a.isTexture){var f=b.createTexture();a.createTexture(f),b.bindTexture(b.TEXTURE_2D,f),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,1),a._setProperty("isTexture",!0)}a.loadPixels();var g=new Uint8Array(a.pixels);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,a.width,a.height,0,b.RGBA,b.UNSIGNED_BYTE,g)}else if(a instanceof e.MediaElement){if(!a.loadedmetadata)return;b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,a.elt)}return d(a.width)&&d(a.height)?b.generateMipmap(b.TEXTURE_2D):(b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE)),b.uniform1i(b.getUniformLocation(c,"uSampler"),0),b.uniform1i(b.getUniformLocation(c,"isTexture"),!0),this},e.prototype.basicMaterial=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader("normalVert","basicFrag");e.useProgram(f),f.uMaterialColor=e.getUniformLocation(f,"uMaterialColor");var g=this._renderer._pInst.color.apply(this._renderer._pInst,arguments),h=g._array;return e.uniform4f(f.uMaterialColor,h[0],h[1],h[2],h[3]),this},e.prototype.ambientMaterial=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader("lightVert","lightTextureFrag");e.useProgram(f),f.uMaterialColor=e.getUniformLocation(f,"uMaterialColor");var g=this._renderer._pInst.color.apply(this._renderer._pInst,arguments),h=g._array;return e.uniform4f(f.uMaterialColor,h[0],h[1],h[2],h[3]),f.uSpecular=e.getUniformLocation(f,"uSpecular"),e.uniform1i(f.uSpecular,!1),e.uniform1i(e.getUniformLocation(f,"isTexture"),!1),this},e.prototype.specularMaterial=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader("lightVert","lightTextureFrag");e.uniform1i(e.getUniformLocation(f,"isTexture"),!1),e.useProgram(f),f.uMaterialColor=e.getUniformLocation(f,"uMaterialColor");var g=this._renderer._pInst.color.apply(this._renderer._pInst,arguments),h=g._array;return e.uniform4f(f.uMaterialColor,h[0],h[1],h[2],h[3]),f.uSpecular=e.getUniformLocation(f,"uSpecular"),e.uniform1i(f.uSpecular,!0),this},b.exports=e},{"../core/core":50}],36:[function(a,b,c){"use strict";function d(a){return a.reduce(function(a,b){return a.concat(b)})}function e(a){return d(a.map(function(a){return[a.x,a.y,a.z]}))}var f=a("../core/core");f.Geometry3D=function(){this.vertices=[],this.vertexNormals=[],this.faces=[],this.faceNormals=[],this.uvs=[]},f.Geometry3D.prototype.parametricGeometry=function(a,b,c,d){var e,f,g,h,i;d=d||0,this.detailX=b,this.detailY=c;var j=b+1;for(e=0;c>=e;e++)for(i=e/c,f=0;b>=f;f++)h=f/b,g=a(h,i),this.vertices.push(g);var k,l,m,n,o,p,q,r;for(e=0;c>e;e++)for(f=0;b>f;f++)k=e*j+f+d,l=e*j+f+1+d,m=(e+1)*j+f+1+d,n=(e+1)*j+f+d,o=[f/b,e/c],p=[(f+1)/b,e/c],q=[(f+1)/b,(e+1)/c],r=[f/b,(e+1)/c],this.faces.push([k,l,n]),this.uvs.push([o,p,r]),this.faces.push([l,m,n]),this.uvs.push([p,q,r])},f.Geometry3D.prototype.computeFaceNormals=function(){for(var a=new f.Vector,b=new f.Vector,c=0;c<this.faces.length;c++){var d=this.faces[c],e=this.vertices[d[0]],g=this.vertices[d[1]],h=this.vertices[d[2]];f.Vector.sub(h,g,a),f.Vector.sub(e,g,b);var i=f.Vector.cross(b,a);i.normalize(),i.mult(-1),this.faceNormals[c]=i}},f.Geometry3D.prototype.computeVertexNormals=function(){var a,b,c,d,e,g=[];for(e=new Array(this.vertices.length),a=0;a<this.vertices.length;a++)e[a]=new f.Vector;for(b=0;b<this.faces.length;b++)c=this.faces[b],d=this.faceNormals[b],e[c[0]].add(d),e[c[1]].add(d),e[c[2]].add(d);for(a=0;a<this.vertices.length;a++)e[a].normalize();for(b=0;b<this.faces.length;b++)c=this.faces[b],g[b]=[],g[b][0]=e[c[0]].copy(),g[b][1]=e[c[1]].copy(),g[b][2]=e[c[2]].copy();for(b=0;b<this.faces.length;b++)c=this.faces[b],d=this.faceNormals[b],this.vertexNormals[c[0]]=g[b][0],this.vertexNormals[c[1]]=g[b][1],this.vertexNormals[c[2]]=g[b][2]},f.Geometry3D.prototype.averageNormals=function(){for(var a=0;a<=this.detailY;a++){var b=this.detailX+1,c=f.Vector.add(this.vertexNormals[a*b],this.vertexNormals[a*b+this.detailX]);c=f.Vector.div(c,2),this.vertexNormals[a*b]=c,this.vertexNormals[a*b+this.detailX]=c}},f.Geometry3D.prototype.averagePoleNormals=function(){for(var a=new f.Vector(0,0,0),b=0;b<this.detailX;b++)a.add(this.vertexNormals[b]);for(a=f.Vector.div(a,this.detailX),b=0;b<this.detailX;b++)this.vertexNormals[b]=a;for(a=new f.Vector(0,0,0),b=this.vertices.length-1;b>this.vertices.length-1-this.detailX;b--)a.add(this.vertexNormals[b]);for(a=f.Vector.div(a,this.detailX),b=this.vertices.length-1;b>this.vertices.length-1-this.detailX;b--)this.vertexNormals[b]=a},f.Geometry3D.prototype.generateUV=function(a,b){a=d(a),b=d(b);var c=[];return a.forEach(function(a,d){c[a]=b[d]}),d(c)},f.Geometry3D.prototype.generateObj=function(a,b){this.computeFaceNormals(),this.computeVertexNormals(),a&&this.averageNormals(),b&&this.averagePoleNormals();var c={vertices:e(this.vertices),vertexNormals:e(this.vertexNormals),uvs:this.generateUV(this.faces,this.uvs),faces:d(this.faces),len:3*this.faces.length};return c},b.exports=f.Geometry3D},{"../core/core":50}],37:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../math/polargeometry"),f=a("../core/constants"),g="undefined"!=typeof Float32Array?Float32Array:Array;d.Matrix=function(){return arguments[0]instanceof d?(this.p5=arguments[0],this.mat4=arguments[1]||new g([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])):this.mat4=arguments[0]||new g([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this},d.Matrix.prototype.set=function(a){return a instanceof d.Matrix?(this.mat4=a.mat4,this):a instanceof g?(this.mat4=a,this):this},d.Matrix.prototype.get=function(){return new d.Matrix(this.mat4)},d.Matrix.prototype.copy=function(){var a=new d.Matrix;return a.mat4[0]=this.mat4[0],a.mat4[1]=this.mat4[1],a.mat4[2]=this.mat4[2],a.mat4[3]=this.mat4[3],a.mat4[4]=this.mat4[4],a.mat4[5]=this.mat4[5],a.mat4[6]=this.mat4[6],a.mat4[7]=this.mat4[7],a.mat4[8]=this.mat4[8],a.mat4[9]=this.mat4[9],a.mat4[10]=this.mat4[10],a.mat4[11]=this.mat4[11],a.mat4[12]=this.mat4[12],a.mat4[13]=this.mat4[13],a.mat4[14]=this.mat4[14],a.mat4[15]=this.mat4[15],a},d.Matrix.identity=function(){return new d.Matrix},d.Matrix.prototype.transpose=function(a){var b,c,e,f,h,i;return a instanceof d.Matrix?(b=a.mat4[1],c=a.mat4[2],e=a.mat4[3],f=a.mat4[6],h=a.mat4[7],i=a.mat4[11],this.mat4[0]=a.mat4[0],this.mat4[1]=a.mat4[4],this.mat4[2]=a.mat4[8],this.mat4[3]=a.mat4[12],this.mat4[4]=b,this.mat4[5]=a.mat4[5],this.mat4[6]=a.mat4[9],this.mat4[7]=a.mat4[13],this.mat4[8]=c,this.mat4[9]=f,this.mat4[10]=a.mat4[10],this.mat4[11]=a.mat4[14],this.mat4[12]=e,this.mat4[13]=h,this.mat4[14]=i,this.mat4[15]=a.mat4[15]):a instanceof g&&(b=a[1],c=a[2],e=a[3],f=a[6],h=a[7],i=a[11],this.mat4[0]=a[0],this.mat4[1]=a[4],this.mat4[2]=a[8],this.mat4[3]=a[12],this.mat4[4]=b,this.mat4[5]=a[5],this.mat4[6]=a[9],this.mat4[7]=a[13],this.mat4[8]=c,this.mat4[9]=f,this.mat4[10]=a[10],this.mat4[11]=a[14],this.mat4[12]=e,this.mat4[13]=h,this.mat4[14]=i,this.mat4[15]=a[15]),this},d.Matrix.prototype.invert=function(a){var b,c,e,f,h,i,j,k,l,m,n,o,p,q,r,s;a instanceof d.Matrix?(b=a.mat4[0],c=a.mat4[1],e=a.mat4[2],f=a.mat4[3],h=a.mat4[4],i=a.mat4[5],j=a.mat4[6],k=a.mat4[7],l=a.mat4[8],m=a.mat4[9],n=a.mat4[10],o=a.mat4[11],p=a.mat4[12],q=a.mat4[13],r=a.mat4[14],s=a.mat4[15]):a instanceof g&&(b=a[0],c=a[1],e=a[2],f=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],m=a[9],n=a[10],o=a[11],p=a[12],q=a[13],r=a[14],s=a[15]);var t=b*i-c*h,u=b*j-e*h,v=b*k-f*h,w=c*j-e*i,x=c*k-f*i,y=e*k-f*j,z=l*q-m*p,A=l*r-n*p,B=l*s-o*p,C=m*r-n*q,D=m*s-o*q,E=n*s-o*r,F=t*E-u*D+v*C+w*B-x*A+y*z;return F?(F=1/F,this.mat4[0]=(i*E-j*D+k*C)*F,this.mat4[1]=(e*D-c*E-f*C)*F,this.mat4[2]=(q*y-r*x+s*w)*F,this.mat4[3]=(n*x-m*y-o*w)*F,this.mat4[4]=(j*B-h*E-k*A)*F,this.mat4[5]=(b*E-e*B+f*A)*F,this.mat4[6]=(r*v-p*y-s*u)*F,this.mat4[7]=(l*y-n*v+o*u)*F,this.mat4[8]=(h*D-i*B+k*z)*F,this.mat4[9]=(c*B-b*D-f*z)*F,this.mat4[10]=(p*x-q*v+s*t)*F,this.mat4[11]=(m*v-l*x-o*t)*F,this.mat4[12]=(i*A-h*C-j*z)*F,this.mat4[13]=(b*C-c*A+e*z)*F,this.mat4[14]=(q*u-p*w-r*t)*F,this.mat4[15]=(l*w-m*u+n*t)*F,this):null},d.Matrix.prototype.determinant=function(){var a=this.mat4[0]*this.mat4[5]-this.mat4[1]*this.mat4[4],b=this.mat4[0]*this.mat4[6]-this.mat4[2]*this.mat4[4],c=this.mat4[0]*this.mat4[7]-this.mat4[3]*this.mat4[4],d=this.mat4[1]*this.mat4[6]-this.mat4[2]*this.mat4[5],e=this.mat4[1]*this.mat4[7]-this.mat4[3]*this.mat4[5],f=this.mat4[2]*this.mat4[7]-this.mat4[3]*this.mat4[6],g=this.mat4[8]*this.mat4[13]-this.mat4[9]*this.mat4[12],h=this.mat4[8]*this.mat4[14]-this.mat4[10]*this.mat4[12],i=this.mat4[8]*this.mat4[15]-this.mat4[11]*this.mat4[12],j=this.mat4[9]*this.mat4[14]-this.mat4[10]*this.mat4[13],k=this.mat4[9]*this.mat4[15]-this.mat4[11]*this.mat4[13],l=this.mat4[10]*this.mat4[15]-this.mat4[11]*this.mat4[14];return a*l-b*k+c*j+d*i-e*h+f*g},d.Matrix.prototype.mult=function(a){var b=new g(16),c=new g(16);a instanceof d.Matrix?c=a.mat4:a instanceof g&&(c=a);var e=this.mat4[0],f=this.mat4[1],h=this.mat4[2],i=this.mat4[3];return b[0]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[1]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[2]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[3]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[4],f=this.mat4[5],h=this.mat4[6],i=this.mat4[7],b[4]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[5]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[6]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[7]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[8],f=this.mat4[9],h=this.mat4[10],i=this.mat4[11],b[8]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[9]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[10]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[11]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[12],f=this.mat4[13],h=this.mat4[14],i=this.mat4[15],b[12]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[13]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[14]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[15]=e*c[3]+f*c[7]+h*c[11]+i*c[15],this.mat4=b,this},d.Matrix.prototype.scale=function(){for(var a,b,c,e=new Array(arguments.length),f=0;f<e.length;f++)e[f]=arguments[f];e[0]instanceof d.Vector?(a=e[0].x,b=e[0].y,c=e[0].z):e[0]instanceof Array&&(a=e[0][0],b=e[0][1],c=e[0][2]);var h=new g(16);return h[0]=this.mat4[0]*a,h[1]=this.mat4[1]*a,h[2]=this.mat4[2]*a,h[3]=this.mat4[3]*a,h[4]=this.mat4[4]*b,h[5]=this.mat4[5]*b,h[6]=this.mat4[6]*b,h[7]=this.mat4[7]*b,h[8]=this.mat4[8]*c,h[9]=this.mat4[9]*c,h[10]=this.mat4[10]*c,h[11]=this.mat4[11]*c,h[12]=this.mat4[12],h[13]=this.mat4[13],h[14]=this.mat4[14],h[15]=this.mat4[15],this.mat4=h,this},d.Matrix.prototype.rotate=function(a,b){var c,g,h,i,j;this.p5?this.p5._angleMode===f.DEGREES&&(i=e.degreesToRadians(a)):i=a,b instanceof d.Vector?(c=b.x,g=b.y,h=b.z):b instanceof Array&&(c=b[0],g=b[1],h=b[2]),j=Math.sqrt(c*c+g*g+h*h),c*=1/j,g*=1/j,h*=1/j;var k=this.mat4[0],l=this.mat4[1],m=this.mat4[2],n=this.mat4[3],o=this.mat4[4],p=this.mat4[5],q=this.mat4[6],r=this.mat4[7],s=this.mat4[8],t=this.mat4[9],u=this.mat4[10],v=this.mat4[11],w=Math.sin(i),x=Math.cos(i),y=1-x,z=c*c*y+x,A=g*c*y+h*w,B=h*c*y-g*w,C=c*g*y-h*w,D=g*g*y+x,E=h*g*y+c*w,F=c*h*y+g*w,G=g*h*y-c*w,H=h*h*y+x;return this.mat4[0]=k*z+o*A+s*B,this.mat4[1]=l*z+p*A+t*B,this.mat4[2]=m*z+q*A+u*B,this.mat4[3]=n*z+r*A+v*B,this.mat4[4]=k*C+o*D+s*E,this.mat4[5]=l*C+p*D+t*E,this.mat4[6]=m*C+q*D+u*E,this.mat4[7]=n*C+r*D+v*E,this.mat4[8]=k*F+o*G+s*H,this.mat4[9]=l*F+p*G+t*H,this.mat4[10]=m*F+q*G+u*H,this.mat4[11]=n*F+r*G+v*H,this},d.Matrix.prototype.translate=function(a){var b=a[0],c=a[1],d=a[2]||0;this.mat4[12]=this.mat4[0]*b+this.mat4[4]*c+this.mat4[8]*d+this.mat4[12],this.mat4[13]=this.mat4[1]*b+this.mat4[5]*c+this.mat4[9]*d+this.mat4[13],this.mat4[14]=this.mat4[2]*b+this.mat4[6]*c+this.mat4[10]*d+this.mat4[14],this.mat4[15]=this.mat4[3]*b+this.mat4[7]*c+this.mat4[11]*d+this.mat4[15]},d.Matrix.prototype.rotateX=function(a){this.rotate(a,[1,0,0])},d.Matrix.prototype.rotateY=function(a){this.rotate(a,[0,1,0])},d.Matrix.prototype.rotateZ=function(a){this.rotate(a,[0,0,1])},d.Matrix.prototype.perspective=function(a,b,c,d){var e=1/Math.tan(a/2),f=1/(c-d);return this.mat4[0]=e/b,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=e,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=(d+c)*f,this.mat4[11]=-1,this.mat4[12]=0,this.mat4[13]=0,this.mat4[14]=2*d*c*f,this.mat4[15]=0,this},d.Matrix.prototype.ortho=function(a,b,c,d,e,f){var g=1/(a-b),h=1/(c-d),i=1/(e-f);return this.mat4[0]=-2*g,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=-2*h,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=2*i,this.mat4[11]=0,this.mat4[12]=(a+b)*g,this.mat4[13]=(d+c)*h,this.mat4[14]=(f+e)*i,this.mat4[15]=1,this},b.exports=d.Matrix},{"../core/constants":49,"../core/core":50,"../math/polargeometry":79}],38:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./shader");a("../core/p5.Renderer"),a("./p5.Matrix");var f=[],g=1e3,h={alpha:!0,depth:!0,stencil:!0,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1};d.Renderer3D=function(a,b,c){d.Renderer.call(this,a,b,c);try{if(this.drawingContext=this.canvas.getContext("webgl",h)||this.canvas.getContext("experimental-webgl",h),null===this.drawingContext)throw new Error("Error creating webgl context");console.log("p5.Renderer3D: enabled webgl context")}catch(e){throw new Error(e)}this.isP3D=!0,this.GL=this.drawingContext;var f=this.GL;return f.clearColor(1,1,1,1),f.clearDepth(1),f.enable(f.DEPTH_TEST),f.depthFunc(f.LEQUAL),f.clear(f.COLOR_BUFFER_BIT|f.DEPTH_BUFFER_BIT),f.viewport(0,0,f.drawingBufferWidth,f.drawingBufferHeight),this._init(),this},d.Renderer3D.prototype=Object.create(d.Renderer.prototype),d.Renderer3D.prototype._applyDefaults=function(){return this},d.Renderer3D.prototype._init=function(a){var b=this.GL;this.initMatrix(),this.initHash(),this.verticeStack=[],this.verticeBuffer=b.createBuffer(),this.colorBuffer=b.createBuffer(),this._setCamera=!1,this.ambientLightCount=0,this.directionalLightCount=0,this.pointLightCount=0},d.Renderer3D.prototype._update=function(){this.resetMatrix(),this.translate(0,0,-800),this.ambientLightCount=0,this.directionalLightCount=0,this.pointLightCount=0,this.verticeStack=[]},d.Renderer3D.prototype.resize=function(a,b){var c=this.GL;d.Renderer.prototype.resize.call(this,a,b),c.viewport(0,0,c.drawingBufferWidth,c.drawingBufferHeight)},d.Renderer3D.prototype.background=function(){var a=this.GL,b=this._pInst.color.apply(this._pInst,arguments),c=b.levels[0]/255,d=b.levels[1]/255,e=b.levels[2]/255,f=b.levels[3]/255;a.clearColor(c,d,e,f),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)},d.Renderer3D.prototype.initShaders=function(a,b,c){var d=this.GL,f=d.createShader(d.VERTEX_SHADER);if(d.shaderSource(f,e[a]),d.compileShader(f),!d.getShaderParameter(f,d.COMPILE_STATUS))return alert("Yikes! An error occurred compiling the shaders:"+d.getShaderInfoLog(f)),null;var g=d.createShader(d.FRAGMENT_SHADER);if(d.shaderSource(g,e[b]),d.compileShader(g),!d.getShaderParameter(g,d.COMPILE_STATUS))return alert("Darn! An error occurred compiling the shaders:"+d.getShaderInfoLog(g)),null;var h=d.createProgram();return d.attachShader(h,f),d.attachShader(h,g),d.linkProgram(h),d.getProgramParameter(h,d.LINK_STATUS)||alert("Snap! Error linking shader program"),this._getLocation(h,c),h},d.Renderer3D.prototype._getLocation=function(a,b){var c=this.GL;c.useProgram(a),a.uResolution=c.getUniformLocation(a,"uResolution"),c.uniform1f(a.uResolution,g),a.vertexPositionAttribute=c.getAttribLocation(a,"aPosition"),c.enableVertexAttribArray(a.vertexPositionAttribute),a.uPMatrixUniform=c.getUniformLocation(a,"uProjectionMatrix"),a.uMVMatrixUniform=c.getUniformLocation(a,"uModelViewMatrix"),void 0===b&&(a.vertexNormalAttribute=c.getAttribLocation(a,"aNormal"),c.enableVertexAttribArray(a.vertexNormalAttribute),a.uNMatrixUniform=c.getUniformLocation(a,"uNormalMatrix"),a.textureCoordAttribute=c.getAttribLocation(a,"aTexCoord"),c.enableVertexAttribArray(a.textureCoordAttribute),a.samplerUniform=c.getUniformLocation(a,"uSampler"))},d.Renderer3D.prototype.setMatrixUniforms=function(a){var b=this.GL,c=this.mHash[a];b.useProgram(c),b.uniformMatrix4fv(c.uPMatrixUniform,!1,this.uPMatrix.mat4),b.uniformMatrix4fv(c.uMVMatrixUniform,!1,this.uMVMatrix.mat4),this.uNMatrix=new d.Matrix,this.uNMatrix.invert(this.uMVMatrix),this.uNMatrix.transpose(this.uNMatrix),b.uniformMatrix4fv(c.uNMatrixUniform,!1,this.uNMatrix.mat4)},d.Renderer3D.prototype._getShader=function(a,b,c){var d=a+"|"+b;if(!this.materialInHash(d)){var e=this.initShaders(a,b,c);this.mHash[d]=e}return this.curShaderId=d,this.mHash[this.curShaderId]},d.Renderer3D.prototype._getCurShaderId=function(){if(void 0===this.curShaderId){var a="normalVert|normalFrag",b=this.initShaders("normalVert","normalFrag");this.mHash[a]=b,this.curShaderId=a}return this.curShaderId},d.Renderer3D.prototype._getCurColor=function(){return void 0===this.curColor&&(this.curColor=[.5,.5,.5,1]),this.curColor},d.Renderer3D.prototype.initHash=function(){this.gHash={},this.mHash={}},d.Renderer3D.prototype.geometryInHash=function(a){return void 0!==this.gHash[a]},d.Renderer3D.prototype.materialInHash=function(a){return void 0!==this.mHash[a]},d.Renderer3D.prototype.initMatrix=function(){this.uMVMatrix=new d.Matrix,this.uPMatrix=new d.Matrix,this.uNMatrix=new d.Matrix},d.Renderer3D.prototype.resetMatrix=function(){this.uMVMatrix=d.Matrix.identity()},d.Renderer3D.prototype._setDefaultCamera=function(){if(!this._setCamera){var a=this.width,b=this.height;this.uPMatrix=d.Matrix.identity(),this.uPMatrix.perspective(60/180*Math.PI,a/b,.1,100),this._setCamera=!0}},d.Renderer3D.prototype.translate=function(a,b,c){return a/=g,b=-b/g,c/=g,this.uMVMatrix.translate([a,b,c]),this},d.Renderer3D.prototype.scale=function(a,b,c){return this.uMVMatrix.scale([a,b,c]),this},d.Renderer3D.prototype.rotate=function(a,b){return this.uMVMatrix.rotate(a,b),this},d.Renderer3D.prototype.rotateX=function(a){return this.uMVMatrix.rotateX(a),this},d.Renderer3D.prototype.rotateY=function(a){return this.uMVMatrix.rotateY(a),this},d.Renderer3D.prototype.rotateZ=function(a){return this.uMVMatrix.rotateZ(a),this},d.Renderer3D.prototype.push=function(){f.push(this.uMVMatrix.copy())},d.Renderer3D.prototype.pop=function(){if(0===f.length)throw new Error("Invalid popMatrix!");this.uMVMatrix=f.pop()},b.exports=d.Renderer3D},{"../core/core":50,"../core/p5.Renderer":56,"./p5.Matrix":37,"./shader":40}],39:[function(a,b,c){"use strict";var d=a("../core/core"),e=0;d.Renderer3D.prototype.createBuffer=function(a,b){if(e++,e>1e3){var c=Object.keys(this.gHash)[0];delete this.gHash[c],e--}var d=this.GL;this.gHash[a]={},this.gHash[a].len=[],this.gHash[a].vertexBuffer=[],this.gHash[a].normalBuffer=[],this.gHash[a].uvBuffer=[],this.gHash[a].indexBuffer=[],b.forEach(function(b){this.gHash[a].len.push(b.len),this.gHash[a].vertexBuffer.push(d.createBuffer()),this.gHash[a].normalBuffer.push(d.createBuffer()),this.gHash[a].uvBuffer.push(d.createBuffer()),this.gHash[a].indexBuffer.push(d.createBuffer())}.bind(this))},d.Renderer3D.prototype.initBuffer=function(a,b){this._setDefaultCamera();var c=this.GL;this.createBuffer(a,b);var d=this.mHash[this._getCurShaderId()];b.forEach(function(b,e){c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].vertexBuffer[e]),c.bufferData(c.ARRAY_BUFFER,new Float32Array(b.vertices),c.STATIC_DRAW),c.vertexAttribPointer(d.vertexPositionAttribute,3,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].normalBuffer[e]),c.bufferData(c.ARRAY_BUFFER,new Float32Array(b.vertexNormals),c.STATIC_DRAW),c.vertexAttribPointer(d.vertexNormalAttribute,3,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].uvBuffer[e]),c.bufferData(c.ARRAY_BUFFER,new Float32Array(b.uvs),c.STATIC_DRAW),c.vertexAttribPointer(d.textureCoordAttribute,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.gHash[a].indexBuffer[e]),c.bufferData(c.ELEMENT_ARRAY_BUFFER,new Uint16Array(b.faces),c.STATIC_DRAW)}.bind(this))},d.Renderer3D.prototype.drawBuffer=function(a){this._setDefaultCamera();var b=this.GL,c=this._getCurShaderId(),d=this.mHash[c];this.gHash[a].len.forEach(function(e,f){b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].vertexBuffer[f]),b.vertexAttribPointer(d.vertexPositionAttribute,3,b.FLOAT,!1,0,0),b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].normalBuffer[f]),b.vertexAttribPointer(d.vertexNormalAttribute,3,b.FLOAT,!1,0,0),
b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].uvBuffer[f]),b.vertexAttribPointer(d.textureCoordAttribute,2,b.FLOAT,!1,0,0),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this.gHash[a].indexBuffer[f]),this.setMatrixUniforms(c),b.drawElements(b.TRIANGLES,this.gHash[a].len[f],b.UNSIGNED_SHORT,0)}.bind(this))},b.exports=d.Renderer3D},{"../core/core":50}],40:[function(a,b,c){b.exports={vertexColorVert:"attribute vec3 aPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform float uResolution;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition / uResolution * vec3(1.0, -1.0, 1.0), 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vColor = aVertexColor;\n}",vertexColorFrag:"precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n  gl_FragColor = vColor;\n}",normalVert:"attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform float uResolution;\n\nvarying vec3 vVertexNormal;\nvarying highp vec2 vVertTexCoord;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition / uResolution, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vVertexNormal = vec3( uNormalMatrix * vec4( aNormal, 1.0 ) );\n  vVertTexCoord = aTexCoord;\n}",normalFrag:"precision mediump float;\nvarying vec3 vVertexNormal;\nvoid main(void) {\n  gl_FragColor = vec4(vVertexNormal, 1.0);\n}",basicFrag:"precision mediump float;\nvarying vec3 vVertexNormal;\nuniform vec4 uMaterialColor;\nvoid main(void) {\n  gl_FragColor = uMaterialColor;\n}",lightVert:"attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform float uResolution;\nuniform int uAmbientLightCount;\nuniform int uDirectionalLightCount;\nuniform int uPointLightCount;\n\nuniform vec3 uAmbientColor[8];\nuniform vec3 uLightingDirection[8];\nuniform vec3 uDirectionalColor[8];\nuniform vec3 uPointLightLocation[8];\nuniform vec3 uPointLightColor[8];\nuniform bool uSpecular;\n\nvarying vec3 vVertexNormal;\nvarying vec2 vVertTexCoord;\nvarying vec3 vLightWeighting;\n\nvec3 ambientLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 directionalLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 pointLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 pointLightFactor2 = vec3(0.0, 0.0, 0.0);\n\nvoid main(void){\n\n  vec4 positionVec4 = vec4(aPosition / uResolution, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n\n  vec3 vertexNormal = vec3( uNormalMatrix * vec4( aNormal, 1.0 ) );\n  vVertexNormal = vertexNormal;\n  vVertTexCoord = aTexCoord;\n\n  vec4 mvPosition = uModelViewMatrix * vec4(aPosition / uResolution, 1.0);\n  vec3 eyeDirection = normalize(-mvPosition.xyz);\n\n  float shininess = 32.0;\n  float specularFactor = 2.0;\n  float diffuseFactor = 0.3;\n\n  for(int i = 0; i < 8; i++){\n    if(uAmbientLightCount == i) break;\n    ambientLightFactor += uAmbientColor[i];\n  }\n\n  for(int j = 0; j < 8; j++){\n    if(uDirectionalLightCount == j) break;\n    vec3 dir = uLightingDirection[j];\n    float directionalLightWeighting = max(dot(vertexNormal, dir), 0.0);\n    directionalLightFactor += uDirectionalColor[j] * directionalLightWeighting;\n  }\n\n  for(int k = 0; k < 8; k++){\n    if(uPointLightCount == k) break;\n    vec3 loc = uPointLightLocation[k];\n    //loc = loc / uResolution;\n    vec3 lightDirection = normalize(loc - mvPosition.xyz);\n\n    float directionalLightWeighting = max(dot(vertexNormal, lightDirection), 0.0);\n    pointLightFactor += uPointLightColor[k] * directionalLightWeighting;\n\n    //factor2 for specular\n    vec3 reflectionDirection = reflect(-lightDirection, vertexNormal);\n    float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), shininess);\n\n    pointLightFactor2 += uPointLightColor[k] * (specularFactor * specularLightWeighting\n      +  directionalLightWeighting * diffuseFactor);\n  }\n  \n  if(!uSpecular){\n    vLightWeighting =  ambientLightFactor + directionalLightFactor + pointLightFactor;\n  }else{\n    vLightWeighting = ambientLightFactor + directionalLightFactor + pointLightFactor2;\n  }\n\n}",lightTextureFrag:"precision mediump float;\n\nuniform vec4 uMaterialColor;\nuniform sampler2D uSampler;\nuniform bool isTexture;\n\nvarying vec3 vLightWeighting;\nvarying highp vec2 vVertTexCoord;\n\nvoid main(void) {\n  if(!isTexture){\n    gl_FragColor = vec4(vec3(uMaterialColor.rgb * vLightWeighting), uMaterialColor.a);\n  }else{\n    vec4 textureColor = texture2D(uSampler, vVertTexCoord);\n    if(vLightWeighting == vec3(0., 0., 0.)){\n      gl_FragColor = textureColor;\n    }else{\n      gl_FragColor = vec4(vec3(textureColor.rgb * vLightWeighting), textureColor.a); \n    }\n  }\n}"}},{}],41:[function(a,b,c){"use strict";var d=a("./core/core");a("./color/p5.Color"),a("./core/p5.Element"),a("./typography/p5.Font"),a("./core/p5.Graphics"),a("./core/p5.Renderer2D"),a("./image/p5.Image"),a("./math/p5.Vector"),a("./io/p5.TableRow"),a("./io/p5.Table"),a("./color/creating_reading"),a("./color/setting"),a("./core/constants"),a("./utilities/conversion"),a("./utilities/array_functions"),a("./utilities/string_functions"),a("./core/environment"),a("./image/image"),a("./image/loading_displaying"),a("./image/pixels"),a("./io/files"),a("./events/keyboard"),a("./events/acceleration"),a("./events/mouse"),a("./utilities/time_date"),a("./events/touch"),a("./math/math"),a("./math/calculation"),a("./math/random"),a("./math/noise"),a("./math/trigonometry"),a("./core/rendering"),a("./core/2d_primitives"),a("./core/attributes"),a("./core/curves"),a("./core/vertex"),a("./core/structure"),a("./core/transform"),a("./typography/attributes"),a("./typography/loading_displaying"),a("./3d/p5.Renderer3D"),a("./3d/p5.Geometry3D"),a("./3d/retainedMode3D"),a("./3d/immediateMode3D"),a("./3d/3d_primitives"),a("./3d/p5.Matrix"),a("./3d/material"),a("./3d/light"),a("./3d/shader"),a("./3d/camera"),a("./3d/interaction");var e=function(){window.PHANTOMJS||window.mocha||(window.setup&&"function"==typeof window.setup||window.draw&&"function"==typeof window.draw)&&new d};"complete"===document.readyState?e():window.addEventListener("load",e,!1),b.exports=d},{"./3d/3d_primitives":30,"./3d/camera":31,"./3d/immediateMode3D":32,"./3d/interaction":33,"./3d/light":34,"./3d/material":35,"./3d/p5.Geometry3D":36,"./3d/p5.Matrix":37,"./3d/p5.Renderer3D":38,"./3d/retainedMode3D":39,"./3d/shader":40,"./color/creating_reading":43,"./color/p5.Color":44,"./color/setting":45,"./core/2d_primitives":46,"./core/attributes":47,"./core/constants":49,"./core/core":50,"./core/curves":51,"./core/environment":52,"./core/p5.Element":54,"./core/p5.Graphics":55,"./core/p5.Renderer2D":57,"./core/rendering":58,"./core/structure":60,"./core/transform":61,"./core/vertex":62,"./events/acceleration":63,"./events/keyboard":64,"./events/mouse":65,"./events/touch":66,"./image/image":68,"./image/loading_displaying":69,"./image/p5.Image":70,"./image/pixels":71,"./io/files":72,"./io/p5.Table":73,"./io/p5.TableRow":74,"./math/calculation":75,"./math/math":76,"./math/noise":77,"./math/p5.Vector":78,"./math/random":80,"./math/trigonometry":81,"./typography/attributes":82,"./typography/loading_displaying":83,"./typography/p5.Font":84,"./utilities/array_functions":85,"./utilities/conversion":86,"./utilities/string_functions":87,"./utilities/time_date":88}],42:[function(a,b,c){"use strict";var d=a("../core/core");d.ColorConversion={},d.ColorConversion._hsbaToHSLA=function(a){var b=a[0],c=a[1],d=a[2],e=(2-c)*d/2;return 0!==e&&(1===e?c=0:.5>e?c/=2-c:c=c*d/(2-2*e)),[b,c,e,a[3]]},d.ColorConversion._hsbaToRGBA=function(a){var b=6*a[0],c=a[1],d=a[2],e=[];if(0===c)e=[d,d,d,a[3]];else{var f,g,h,i=Math.floor(b),j=d*(1-c),k=d*(1-c*(b-i)),l=d*(1-c*(1+i-b));0===i?(f=d,g=l,h=j):1===i?(f=k,g=d,h=j):2===i?(f=j,g=d,h=l):3===i?(f=j,g=k,h=d):4===i?(f=l,g=j,h=d):(f=d,g=j,h=k),e=[f,g,h,a[3]]}return e},d.ColorConversion._hslaToHSBA=function(a){var b,c=a[0],d=a[1],e=a[2];return b=.5>e?(1+d)*e:e+d-e*d,d=2*(b-e)/b,[c,d,b,a[3]]},d.ColorConversion._hslaToRGBA=function(a){var b=6*a[0],c=a[1],d=a[2],e=[];if(0===c)e=[d,d,d,a[3]];else{var f;f=.5>d?(1+c)*d:d+c-d*c;var g=2*d-f,h=function(a,b,c){return 0>a?a+=6:a>=6&&(a-=6),1>a?b+(c-b)*a:3>a?c:4>a?b+(c-b)*(4-a):b};e=[h(b+2,g,f),h(b,g,f),h(b-2,g,f),a[3]]}return e},d.ColorConversion._rgbaToHSBA=function(a){var b,c,d=a[0],e=a[1],f=a[2],g=Math.max(d,e,f),h=g-Math.min(d,e,f);return 0===h?(b=0,c=0):(c=h/g,d===g?b=(e-f)/h:e===g?b=2+(f-d)/h:f===g&&(b=4+(d-e)/h),0>b?b+=6:b>=6&&(b-=6)),[b/6,c,g,a[3]]},d.ColorConversion._rgbaToHSLA=function(a){var b,c,d=a[0],e=a[1],f=a[2],g=Math.max(d,e,f),h=Math.min(d,e,f),i=g+h,j=g-h;return 0===j?(b=0,c=0):(c=1>i?j/i:j/(2-j),d===g?b=(e-f)/j:e===g?b=2+(f-d)/j:f===g&&(b=4+(d-e)/j),0>b?b+=6:b>=6&&(b-=6)),[b/6,c,i/2,a[3]]},b.exports=d.ColorConversion},{"../core/core":50}],43:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../core/constants");a("./p5.Color"),d.prototype.alpha=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getAlpha();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.blue=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getBlue();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.brightness=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getBrightness();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.color=function(){return arguments[0]instanceof d.Color?arguments[0]:arguments[0]instanceof Array?new d.Color(this,arguments[0]):new d.Color(this,arguments)},d.prototype.green=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getGreen();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.hue=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getHue();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.lerpColor=function(a,b,c){var d,f,g,h,i,j,k=this._renderer._colorMode,l=this._renderer._colorMaxes;if(k===e.RGB)i=a.levels.map(function(a){return a/255}),j=b.levels.map(function(a){return a/255});else if(k===e.HSB)a._getBrightness(),b._getBrightness(),i=a.hsba,j=b.hsba;else{if(k!==e.HSL)throw new Error(k+"cannot be used for interpolation.");a._getLightness(),b._getLightness(),i=a.hsla,j=b.hsla}return c=Math.max(Math.min(c,1),0),d=this.lerp(i[0],j[0],c),f=this.lerp(i[1],j[1],c),g=this.lerp(i[2],j[2],c),h=this.lerp(i[3],j[3],c),d*=l[k][0],f*=l[k][1],g*=l[k][2],h*=l[k][3],this.color(d,f,g,h)},d.prototype.lightness=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getLightness();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.red=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getRed();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.saturation=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getSaturation();throw new Error("Needs p5.Color or pixel array as argument.")},b.exports=d},{"../core/constants":49,"../core/core":50,"./p5.Color":44}],44:[function(a,b,c){var d=a("../core/core"),e=a("../core/constants"),f=a("./color_conversion");d.Color=function(a,b){if(this.mode=a._renderer._colorMode,this.maxes=a._renderer._colorMaxes,this.mode!==e.RGB&&this.mode!==e.HSL&&this.mode!==e.HSB)throw new Error(this.mode+" is an invalid colorMode.");return this._array=d.Color._parseInputs.apply(a,b),this.levels=this._array.map(function(a){return Math.round(255*a)}),this},d.Color.prototype.toString=function(){var a=this.levels;return a[3]=this._array[3],"rgba("+a[0]+","+a[1]+","+a[2]+","+a[3]+")"},d.Color.prototype._getAlpha=function(){return this._array[3]*this.maxes[this.mode][3]},d.Color.prototype._getBlue=function(){return this._array[2]*this.maxes[e.RGB][2]},d.Color.prototype._getBrightness=function(){return this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[2]*this.maxes[e.HSB][2]},d.Color.prototype._getGreen=function(){return this._array[1]*this.maxes[e.RGB][1]},d.Color.prototype._getHue=function(){return this.mode===e.HSB?(this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[0]*this.maxes[e.HSB][0]):(this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[0]*this.maxes[e.HSL][0])},d.Color.prototype._getLightness=function(){return this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[2]*this.maxes[e.HSL][2]},d.Color.prototype._getRed=function(){return this._array[0]*this.maxes[e.RGB][0]},d.Color.prototype._getSaturation=function(){return this.mode===e.HSB?(this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[1]*this.maxes[e.HSB][1]):(this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[1]*this.maxes[e.HSL][1])};var g={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},h=/\s*/,i=/(\d{1,3})/,j=/((?:\d+(?:\.\d+)?)|(?:\.\d+))/,k=new RegExp(j.source+"%"),l={HEX3:/^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,HEX6:/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,RGB:new RegExp(["^rgb\\(",i.source,",",i.source,",",i.source,"\\)$"].join(h.source),"i"),RGB_PERCENT:new RegExp(["^rgb\\(",k.source,",",k.source,",",k.source,"\\)$"].join(h.source),"i"),RGBA:new RegExp(["^rgba\\(",i.source,",",i.source,",",i.source,",",j.source,"\\)$"].join(h.source),"i"),RGBA_PERCENT:new RegExp(["^rgba\\(",k.source,",",k.source,",",k.source,",",j.source,"\\)$"].join(h.source),"i"),HSL:new RegExp(["^hsl\\(",i.source,",",k.source,",",k.source,"\\)$"].join(h.source),"i"),HSLA:new RegExp(["^hsla\\(",i.source,",",k.source,",",k.source,",",j.source,"\\)$"].join(h.source),"i"),HSB:new RegExp(["^hsb\\(",i.source,",",k.source,",",k.source,"\\)$"].join(h.source),"i"),HSBA:new RegExp(["^hsba\\(",i.source,",",k.source,",",k.source,",",j.source,"\\)$"].join(h.source),"i")};d.Color._parseInputs=function(){var a=arguments.length,b=this._renderer._colorMode,c=this._renderer._colorMaxes,h=[];if(a>=3)return h[0]=arguments[0]/c[b][0],h[1]=arguments[1]/c[b][1],h[2]=arguments[2]/c[b][2],"number"==typeof arguments[3]?h[3]=arguments[3]/c[b][3]:h[3]=1,h=h.map(function(a){return Math.max(Math.min(a,1),0)}),b===e.HSL?f._hslaToRGBA(h):b===e.HSB?f._hsbaToRGBA(h):h;if(1===a&&"string"==typeof arguments[0]){var i=arguments[0].trim().toLowerCase();if(g[i])return d.Color._parseInputs.apply(this,[g[i]]);if(l.HEX3.test(i))return h=l.HEX3.exec(i).slice(1).map(function(a){return parseInt(a+a,16)/255}),h[3]=1,h;if(l.HEX6.test(i))return h=l.HEX6.exec(i).slice(1).map(function(a){return parseInt(a,16)/255}),h[3]=1,h;if(l.RGB.test(i))return h=l.RGB.exec(i).slice(1).map(function(a){return a/255}),h[3]=1,h;if(l.RGB_PERCENT.test(i))return h=l.RGB_PERCENT.exec(i).slice(1).map(function(a){return parseFloat(a)/100}),h[3]=1,h;if(l.RGBA.test(i))return h=l.RGBA.exec(i).slice(1).map(function(a,b){return 3===b?parseFloat(a):a/255});if(l.RGBA_PERCENT.test(i))return h=l.RGBA_PERCENT.exec(i).slice(1).map(function(a,b){return 3===b?parseFloat(a):parseFloat(a)/100});if(l.HSL.test(i)?(h=l.HSL.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:parseInt(a,10)/100}),h[3]=1):l.HSLA.test(i)&&(h=l.HSLA.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:3===b?parseFloat(a):parseInt(a,10)/100})),h.length)return f._hslaToRGBA(h);if(l.HSB.test(i)?(h=l.HSB.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:parseInt(a,10)/100}),h[3]=1):l.HSBA.test(i)&&(h=l.HSBA.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:3===b?parseFloat(a):parseInt(a,10)/100})),h.length)return f._hsbaToRGBA(h);h=[1,1,1,1]}else{if(1!==a&&2!==a||"number"!=typeof arguments[0])throw new Error(arguments+"is not a valid color representation.");h[0]=arguments[0]/c[b][2],h[1]=arguments[0]/c[b][2],h[2]=arguments[0]/c[b][2],"number"==typeof arguments[1]?h[3]=arguments[1]/c[b][3]:h[3]=1,h=h.map(function(a){return Math.max(Math.min(a,1),0)})}return h},b.exports=d.Color},{"../core/constants":49,"../core/core":50,"./color_conversion":42}],45:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../core/constants");a("./p5.Color"),d.prototype.background=function(){return arguments[0]instanceof d.Image?this.image(arguments[0],0,0,this.width,this.height):this._renderer.background.apply(this._renderer,arguments),this},d.prototype.clear=function(){return this._renderer.clear(),this},d.prototype.colorMode=function(){if(arguments[0]===e.RGB||arguments[0]===e.HSB||arguments[0]===e.HSL){this._renderer._colorMode=arguments[0];var a=this._renderer._colorMaxes[this._renderer._colorMode];2===arguments.length?(a[0]=arguments[1],a[1]=arguments[1],a[2]=arguments[1],a[3]=arguments[1]):4===arguments.length?(a[0]=arguments[1],a[1]=arguments[2],a[2]=arguments[3]):5===arguments.length&&(a[0]=arguments[1],a[1]=arguments[2],a[2]=arguments[3],a[3]=arguments[4])}return this},d.prototype.fill=function(){return this._renderer._setProperty("_fillSet",!0),this._renderer._setProperty("_doFill",!0),this._renderer.fill.apply(this._renderer,arguments),this},d.prototype.noFill=function(){return this._renderer._setProperty("_doFill",!1),this},d.prototype.noStroke=function(){return this._renderer._setProperty("_doStroke",!1),this},d.prototype.stroke=function(){return this._renderer._setProperty("_strokeSet",!0),this._renderer._setProperty("_doStroke",!0),this._renderer.stroke.apply(this._renderer,arguments),this},b.exports=d},{"../core/constants":49,"../core/core":50,"./p5.Color":44}],46:[function(a,b,c){"use strict";var d=a("./core"),e=a("./constants");a("./error_helpers"),d.prototype.arc=function(a,b,c,d,f,g,h){for(var i=new Array(arguments.length),j=0;j<i.length;++j)i[j]=arguments[j];if(this._validateParameters("arc",i,[["Number","Number","Number","Number","Number","Number"],["Number","Number","Number","Number","Number","Number","String"]]),!this._renderer._doStroke&&!this._renderer._doFill)return this;for(this._angleMode===e.DEGREES&&(f=this.radians(f),g=this.radians(g));0>f;)f+=e.TWO_PI;for(;0>g;)g+=e.TWO_PI;return f%=e.TWO_PI,g%=e.TWO_PI,f=f<=e.HALF_PI?Math.atan(c/d*Math.tan(f)):f>e.HALF_PI&&f<=3*e.HALF_PI?Math.atan(c/d*Math.tan(f))+e.PI:Math.atan(c/d*Math.tan(f))+e.TWO_PI,g=g<=e.HALF_PI?Math.atan(c/d*Math.tan(g)):g>e.HALF_PI&&g<=3*e.HALF_PI?Math.atan(c/d*Math.tan(g))+e.PI:Math.atan(c/d*Math.tan(g))+e.TWO_PI,f>g&&(g+=e.TWO_PI),c=Math.abs(c),d=Math.abs(d),this._renderer.arc(a,b,c,d,f,g,h),this},d.prototype.ellipse=function(a,b,c,d){for(var e=new Array(arguments.length),f=0;f<e.length;++f)e[f]=arguments[f];return this._validateParameters("ellipse",e,["Number","Number","Number","Number"]),this._renderer._doStroke||this._renderer._doFill?(c=Math.abs(c),d=Math.abs(d),this._renderer.ellipse(a,b,c,d),this):this},d.prototype.line=function(){if(!this._renderer._doStroke)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?(this._validateParameters("line",a,[["Number","Number","Number","Number","Number","Number"]]),this._renderer.line(a[0],a[1],a[2],a[3],a[4],a[5])):(this._validateParameters("line",a,[["Number","Number","Number","Number"]]),this._renderer.line(a[0],a[1],a[2],a[3])),this},d.prototype.point=function(){if(!this._renderer._doStroke)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?(this._validateParameters("point",a,[["Number","Number","Number"]]),this._renderer.point(a[0],a[1],a[2])):(this._validateParameters("point",a,[["Number","Number"]]),this._renderer.point(a[0],a[1])),this},d.prototype.quad=function(){if(!this._renderer._doStroke&&!this._renderer._doFill)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?(this._validateParameters("quad",a,[["Number","Number","Number","Number","Number","Number","Number","Number","Number","Number","Number","Number"]]),this._renderer.quad(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11])):(this._validateParameters("quad",a,[["Number","Number","Number","Number","Number","Number","Number","Number"]]),this._renderer.quad(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7])),this},d.prototype.rect=function(a,b,c,d,e,f,g,h){for(var i=new Array(arguments.length),j=0;j<i.length;++j)i[j]=arguments[j];return this._validateParameters("rect",i,[["Number","Number","Number","Number"],["Number","Number","Number","Number","Number"],["Number","Number","Number","Number","Number","Number","Number","Number"]]),this._renderer._doStroke||this._renderer._doFill?(this._renderer.rect(a,b,c,d,e,f,g,h),this):void 0},d.prototype.triangle=function(){if(!this._renderer._doStroke&&!this._renderer._doFill)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?(this._validateParameters("triangle",a,[["Number","Number","Number","Number","Number","Number","Number","Number","Number"]]),this._renderer.triangle(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8])):(this._validateParameters("triangle",a,[["Number","Number","Number","Number","Number","Number"]]),this._renderer.triangle(a[0],a[1],a[2],a[3],a[4],a[5])),this},b.exports=d},{"./constants":49,"./core":50,"./error_helpers":53}],47:[function(a,b,c){"use strict";var d=a("./core"),e=a("./constants");d.prototype.ellipseMode=function(a){return(a===e.CORNER||a===e.CORNERS||a===e.RADIUS||a===e.CENTER)&&(this._renderer._ellipseMode=a),this},d.prototype.noSmooth=function(){return this._renderer.noSmooth(),this},d.prototype.rectMode=function(a){return(a===e.CORNER||a===e.CORNERS||a===e.RADIUS||a===e.CENTER)&&(this._renderer._rectMode=a),this},d.prototype.smooth=function(){return this._renderer.smooth(),this},d.prototype.strokeCap=function(a){return(a===e.ROUND||a===e.SQUARE||a===e.PROJECT)&&this._renderer.strokeCap(a),this},d.prototype.strokeJoin=function(a){return(a===e.ROUND||a===e.BEVEL||a===e.MITER)&&this._renderer.strokeJoin(a),this},d.prototype.strokeWeight=function(a){return this._renderer.strokeWeight(a),this},b.exports=d},{"./constants":49,"./core":50}],48:[function(a,b,c){var d=a("./constants");b.exports={modeAdjust:function(a,b,c,e,f){return f===d.CORNER?{x:a,y:b,w:c,h:e}:f===d.CORNERS?{x:a,y:b,w:c-a,h:e-b}:f===d.RADIUS?{x:a-c,y:b-e,w:2*c,h:2*e}:f===d.CENTER?{x:a-.5*c,y:b-.5*e,w:c,h:e}:void 0},arcModeAdjust:function(a,b,c,e,f){return f===d.CORNER?{x:a+.5*c,y:b+.5*e,w:c,h:e}:f===d.CORNERS?{x:a,y:b,w:c+a,h:e+b}:f===d.RADIUS?{x:a,y:b,w:2*c,h:2*e}:f===d.CENTER?{x:a,y:b,w:c,h:e}:void 0}}},{"./constants":49}],49:[function(a,b,c){var d=Math.PI;b.exports={P2D:"p2d",WEBGL:"webgl",ARROW:"default",CROSS:"crosshair",HAND:"pointer",MOVE:"move",TEXT:"text",WAIT:"wait",HALF_PI:d/2,PI:d,QUARTER_PI:d/4,TAU:2*d,TWO_PI:2*d,DEGREES:"degrees",RADIANS:"radians",CORNER:"corner",CORNERS:"corners",RADIUS:"radius",RIGHT:"right",LEFT:"left",CENTER:"center",TOP:"top",BOTTOM:"bottom",BASELINE:"alphabetic",POINTS:"points",LINES:"lines",TRIANGLES:"triangles",TRIANGLE_FAN:"triangles_fan",TRIANGLE_STRIP:"triangles_strip",QUADS:"quads",QUAD_STRIP:"quad_strip",CLOSE:"close",OPEN:"open",CHORD:"chord",PIE:"pie",PROJECT:"square",SQUARE:"butt",ROUND:"round",BEVEL:"bevel",MITER:"miter",RGB:"rgb",HSB:"hsb",HSL:"hsl",AUTO:"auto",ALT:18,BACKSPACE:8,CONTROL:17,DELETE:46,DOWN_ARROW:40,ENTER:13,ESCAPE:27,LEFT_ARROW:37,OPTION:18,RETURN:13,RIGHT_ARROW:39,SHIFT:16,TAB:9,UP_ARROW:38,BLEND:"normal",ADD:"lighter",DARKEST:"darken",LIGHTEST:"lighten",DIFFERENCE:"difference",EXCLUSION:"exclusion",MULTIPLY:"multiply",SCREEN:"screen",REPLACE:"source-over",OVERLAY:"overlay",HARD_LIGHT:"hard-light",SOFT_LIGHT:"soft-light",DODGE:"color-dodge",BURN:"color-burn",THRESHOLD:"threshold",GRAY:"gray",OPAQUE:"opaque",INVERT:"invert",POSTERIZE:"posterize",DILATE:"dilate",ERODE:"erode",BLUR:"blur",NORMAL:"normal",ITALIC:"italic",BOLD:"bold",_DEFAULT_TEXT_FILL:"#000000",_DEFAULT_LEADMULT:1.25,_CTX_MIDDLE:"middle",LINEAR:"linear",QUADRATIC:"quadratic",BEZIER:"bezier",CURVE:"curve",_DEFAULT_STROKE:"#000000",_DEFAULT_FILL:"#FFFFFF"}},{}],50:[function(a,b,c){"use strict";a("./shim");var d=a("./constants"),e=function(a,b,c){2===arguments.length&&"boolean"==typeof b&&(c=b,b=void 0),this._setupDone=!1,this._pixelDensity=Math.ceil(window.devicePixelRatio)||1,this._userNode=b,this._curElement=null,this._elements=[],this._requestAnimId=0,this._preloadCount=0,this._isGlobal=!1,this._loop=!0,this._styles=[],this._defaultCanvasSize={width:100,height:100},this._events={mousemove:null,mousedown:null,mouseup:null,dragend:null,dragover:null,click:null,mouseover:null,mouseout:null,keydown:null,keyup:null,keypress:null,touchstart:null,touchmove:null,touchend:null,resize:null,blur:null},window.DeviceOrientationEvent&&(this._events.deviceorientation=null),window.DeviceMotionEvent&&!window._isNodeWebkit&&(this._events.devicemotion=null),this._events.wheel=null,this._loadingScreenId="p5_loading",this._start=function(){this._userNode&&"string"==typeof this._userNode&&(this._userNode=document.getElementById(this._userNode)),this.createCanvas(this._defaultCanvasSize.width,this._defaultCanvasSize.height,"p2d",!0);var a=this.preload||window.preload;if(a){var b=document.getElementById(this._loadingScreenId);if(!b){b=document.createElement("div"),b.innerHTML="Loading...",b.style.position="absolute",b.id=this._loadingScreenId;var c=this._userNode||document.body;c.appendChild(b)}for(var d in this._preloadMethods){this._preloadMethods[d]=this._preloadMethods[d]||e;var f=this._preloadMethods[d];(f===e.prototype||f===e)&&(f=this._isGlobal?window:this),this._registeredPreloadMethods[d]=f[d],f[d]=this._wrapPreload(f,d)}a(),this._runIfPreloadsAreDone()}else this._setup(),this._runFrames(),this._draw()}.bind(this),this._runIfPreloadsAreDone=function(){var a=this._isGlobal?window:this;if(0===a._preloadCount){var b=document.getElementById(a._loadingScreenId);b&&b.parentNode.removeChild(b),a._setup(),a._runFrames(),a._draw()}},this._decrementPreload=function(){var a=this._isGlobal?window:this;a._setProperty("_preloadCount",a._preloadCount-1),a._runIfPreloadsAreDone()},this._wrapPreload=function(a,b){return function(){this._incrementPreload();var c=Array.prototype.slice.call(arguments);return c.push(this._decrementPreload.bind(this)),this._registeredPreloadMethods[b].apply(a,c)}.bind(this)},this._incrementPreload=function(){var a=this._isGlobal?window:this;a._setProperty("_preloadCount",a._preloadCount+1)},this._setup=function(){var a=this._isGlobal?window:this;if("function"==typeof a.preload)for(var b in this._preloadMethods)a[b]=this._preloadMethods[b][b];"function"==typeof a.setup&&a.setup();for(var c=new RegExp(/(^|\s)p5_hidden(?!\S)/g),d=document.getElementsByClassName("p5_hidden"),e=0;e<d.length;e++){var f=d[e];f.style.visibility="",f.className=f.className.replace(c,"")}this._setupDone=!0}.bind(this),this._draw=function(){var a=window.performance.now(),b=a-this._lastFrameTime,c=1e3/this._targetFrameRate,d=5;(!this._loop||b>=c-d)&&(this._renderer.isP3D&&this._renderer._update(),this._setProperty("frameCount",this.frameCount+1),this._updateMouseCoords(),this._updateTouchCoords(),this.redraw(),this._frameRate=1e3/(a-this._lastFrameTime),this._lastFrameTime=a),this._loop&&(this._requestAnimId=window.requestAnimationFrame(this._draw))}.bind(this),this._runFrames=function(){this._updateInterval&&clearInterval(this._updateInterval)}.bind(this),this._setProperty=function(a,b){this[a]=b,this._isGlobal&&(window[a]=b)}.bind(this),this.remove=function(){if(this._curElement){this._loop=!1,this._requestAnimId&&window.cancelAnimationFrame(this._requestAnimId);for(var a in this._events)window.removeEventListener(a,this._events[a]);for(var b=0;b<this._elements.length;b++){var c=this._elements[b];c.elt.parentNode&&c.elt.parentNode.removeChild(c.elt);for(var d in c._events)c.elt.removeEventListener(d,c._events[d])}var f=this;if(this._registeredMethods.remove.forEach(function(a){"undefined"!=typeof a&&a.call(f)}),this._isGlobal){for(var g in e.prototype)try{delete window[g]}catch(h){window[g]=void 0}for(var i in this)if(this.hasOwnProperty(i))try{delete window[i]}catch(h){window[i]=void 0}}}}.bind(this);for(var f in d)e.prototype[f]=d[f];if(a)a(this);else{this._isGlobal=!0;for(var g in e.prototype)if("function"==typeof e.prototype[g]){var h=g.substring(2);this._events.hasOwnProperty(h)||(window[g]=e.prototype[g].bind(this))}else window[g]=e.prototype[g];for(var i in this)this.hasOwnProperty(i)&&(window[i]=this[i])}for(var j in this._events){var k=this["_on"+j];if(k){var l=k.bind(this);window.addEventListener(j,l),this._events[j]=l}}var m=function(){this._setProperty("focused",!0)}.bind(this),n=function(){this._setProperty("focused",!1)}.bind(this);window.addEventListener("focus",m),window.addEventListener("blur",n),this.registerMethod("remove",function(){window.removeEventListener("focus",m),window.removeEventListener("blur",n)}),c?this._start():"complete"===document.readyState?this._start():window.addEventListener("load",this._start.bind(this),!1)};e.prototype._preloadMethods={
loadJSON:e.prototype,loadImage:e.prototype,loadStrings:e.prototype,loadXML:e.prototype,loadShape:e.prototype,loadTable:e.prototype,loadFont:e.prototype},e.prototype._registeredMethods={pre:[],post:[],remove:[]},e.prototype._registeredPreloadMethods={},e.prototype.registerPreloadMethod=function(a,b){e.prototype._preloadMethods.hasOwnProperty(a)||(e.prototype._preloadMethods[a]=b)},e.prototype.registerMethod=function(a,b){e.prototype._registeredMethods.hasOwnProperty(a)||(e.prototype._registeredMethods[a]=[]),e.prototype._registeredMethods[a].push(b)},b.exports=e},{"./constants":49,"./shim":59}],51:[function(a,b,c){"use strict";var d=a("./core");a("./error_helpers");var e=20,f=20;d.prototype.bezier=function(a,b,c,d,e,f,g,h){for(var i=new Array(arguments.length),j=0;j<i.length;++j)i[j]=arguments[j];return this._validateParameters("bezier",i,["Number","Number","Number","Number","Number","Number","Number","Number"]),this._renderer._doStroke?(this._renderer.bezier(a,b,c,d,e,f,g,h),this):this},d.prototype.bezierDetail=function(a){return e=a,this},d.prototype.bezierPoint=function(a,b,c,d,e){var f=1-e;return Math.pow(f,3)*a+3*Math.pow(f,2)*e*b+3*f*Math.pow(e,2)*c+Math.pow(e,3)*d},d.prototype.bezierTangent=function(a,b,c,d,e){var f=1-e;return 3*d*Math.pow(e,2)-3*c*Math.pow(e,2)+6*c*f*e-6*b*f*e+3*b*Math.pow(f,2)-3*a*Math.pow(f,2)},d.prototype.curve=function(a,b,c,d,e,f,g,h){for(var i=new Array(arguments.length),j=0;j<i.length;++j)i[j]=arguments[j];return this._validateParameters("curve",i,["Number","Number","Number","Number","Number","Number","Number","Number"]),this._renderer._doStroke?(this._renderer.curve(a,b,c,d,e,f,g,h),this):void 0},d.prototype.curveDetail=function(a){return f=a,this},d.prototype.curveTightness=function(a){this._renderer._curveTightness=a},d.prototype.curvePoint=function(a,b,c,d,e){var f=e*e*e,g=e*e,h=-.5*f+g-.5*e,i=1.5*f-2.5*g+1,j=-1.5*f+2*g+.5*e,k=.5*f-.5*g;return a*h+b*i+c*j+d*k},d.prototype.curveTangent=function(a,b,c,d,e){var f=e*e,g=-3*f/2+2*e-.5,h=9*f/2-5*e,i=-9*f/2+4*e+.5,j=3*f/2-e;return a*g+b*h+c*i+d*j},b.exports=d},{"./core":50,"./error_helpers":53}],52:[function(a,b,c){"use strict";function d(a){var b=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled;if(!b)throw new Error("Fullscreen not enabled in this browser.");a.requestFullscreen?a.requestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.msRequestFullscreen&&a.msRequestFullscreen()}function e(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()}var f=a("./core"),g=a("./constants"),h=[g.ARROW,g.CROSS,g.HAND,g.MOVE,g.TEXT,g.WAIT];f.prototype._frameRate=0,f.prototype._lastFrameTime=window.performance.now(),f.prototype._targetFrameRate=60,window.console&&console.log?f.prototype.print=function(a){try{var b=JSON.parse(JSON.stringify(a));console.log(b)}catch(c){console.log(a)}}:f.prototype.print=function(){},f.prototype.println=f.prototype.print,f.prototype.frameCount=0,f.prototype.focused=document.hasFocus(),f.prototype.cursor=function(a,b,c){var d="auto",e=this._curElement.elt;if(h.indexOf(a)>-1)d=a;else if("string"==typeof a){var f="";b&&c&&"number"==typeof b&&"number"==typeof c&&(f=b+" "+c),d="http://"!==a.substring(0,6)?"url("+a+") "+f+", auto":/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(a)?"url("+a+") "+f+", auto":a}e.style.cursor=d},f.prototype.frameRate=function(a){return"number"!=typeof a||0>=a?this._frameRate:(this._setProperty("_targetFrameRate",a),this._runFrames(),this)},f.prototype.getFrameRate=function(){return this.frameRate()},f.prototype.setFrameRate=function(a){return this.frameRate(a)},f.prototype.noCursor=function(){this._curElement.elt.style.cursor="none"},f.prototype.displayWidth=screen.width,f.prototype.displayHeight=screen.height,f.prototype.windowWidth=window.innerWidth,f.prototype.windowHeight=window.innerHeight,f.prototype._onresize=function(a){this._setProperty("windowWidth",window.innerWidth),this._setProperty("windowHeight",window.innerHeight);var b,c=this._isGlobal?window:this;"function"==typeof c.windowResized&&(b=c.windowResized(a),void 0===b||b||a.preventDefault())},f.prototype.width=0,f.prototype.height=0,f.prototype.fullScreen=function(a){return"undefined"==typeof a?document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement:void(a?d(document.documentElement):e())},f.prototype.pixelDensity=function(a){return"number"!=typeof a?this._pixelDensity:(this._pixelDensity=a,void this.resizeCanvas(this.width,this.height,!0))},f.prototype.displayDensity=function(){return window.devicePixelRatio},f.prototype.getURL=function(){return location.href},f.prototype.getURLPath=function(){return location.pathname.split("/").filter(function(a){return""!==a})},f.prototype.getURLParams=function(){for(var a,b=/[?&]([^&=]+)(?:[&=])([^&=]+)/gim,c={};null!=(a=b.exec(location.search));)a.index===b.lastIndex&&b.lastIndex++,c[a[1]]=a[2];return c},b.exports=f},{"./constants":49,"./core":50}],53:[function(a,b,c){"use strict";function d(a,b,c){if(a.match(/^p5\./)){var d=a.split(".");return c instanceof h[d[1]]}return"Boolean"===a||a.toLowerCase()===b||q.indexOf(a)>-1&&p(c)}function e(a,b,c){i&&(f(),i=!1),"undefined"===n(c)?c="#B40033":"number"===n(c)&&(c=v[c])}function f(){var a="transparent",b="#ED225D",c="#ED225D",d="white";console.log("%c    _ \n /\\| |/\\ \n \\ ` ' /  \n / , . \\  \n \\/|_|\\/ \n\n%c> p5.js says: Welcome! This is your friendly debugger. To turn me off switch to using “p5.min.js”.","background-color:"+a+";color:"+b+";","background-color:"+c+";color:"+d+";")}function g(a){x.forEach(function(b){a.message&&-1!==a.message.indexOf(b)&&console.log("%c Did you just try to use p5.js's '"+b+"' function or variable? If so, you may want to move it into your sketch's setup() function.","color: #B40033")})}for(var h=a("./core"),i=!1,j={},k=j.toString,l=["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error"],m=0;m<l.length;m++)j["[object "+l[m]+"]"]=l[m].toLowerCase();var n=function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},o=Array.isArray||function(a){return"array"===n(a)},p=function(a){return!o(a)&&a-parseFloat(a)+1>=0},q=["Number","Integer","Number/Constant"],r=0,s=1,t=2,u=3,v=["#2D7BB6","#EE9900","#4DB200","#C83C00"];h.prototype._validateParameters=function(a,b,c){o(c[0])||(c=[c]);for(var f,g=Math.abs(b.length-c[0].length),h=0,i=1,j=c.length;j>i;i++){var k=Math.abs(b.length-c[i].length);g>=k&&(h=i,g=k)}var l="X";g>0&&(f="You wrote "+a+"(",b.length>0&&(f+=l+Array(b.length).join(","+l)),f+="). "+a+" was expecting "+c[h].length+" parameters. Try "+a+"(",c[h].length>0&&(f+=l+Array(c[h].length).join(","+l)),f+=").",c.length>1&&(f+=" "+a+" takes different numbers of parameters depending on what you want to do. Click this link to learn more: "),e(f,a,r));for(var m=0;m<c.length;m++)for(var p=0;p<c[m].length&&p<b.length;p++){var q=c[m][p],u=n(b[p]);"undefined"===u||null===u?e("It looks like "+a+" received an empty variable in spot #"+(p+1)+". If not intentional, this is often a problem with scope: [link to scope].",a,s):"*"===q||d(q,u,b[p])||(f=a+" was expecting a "+q.toLowerCase()+" for parameter #"+(p+1)+", received ",f+="string"===u?'"'+b[p]+'"':b[p],f+=" instead.",c.length>1&&(f+=" "+a+" takes different numbers of parameters depending on what you want to do. Click this link to learn more:"),e(f,a,t))}},h.prototype._validateParameters=function(){return!0};var w={0:{fileType:"image",method:"loadImage",message:" hosting the image online,"},1:{fileType:"XML file",method:"loadXML"},2:{fileType:"table file",method:"loadTable"},3:{fileType:"text file",method:"loadStrings"}};h._friendlyFileLoadError=function(a,b){var c=w[a],d="It looks like there was a problem loading your "+c.fileType+". Try checking if the file path%c ["+b+"] %cis correct,"+(c.message||"")+" or running a local server.";e(d,c.method,u)};var x=["color","random"];"complete"!==document.readyState&&(window.addEventListener("error",g,!1),window.addEventListener("load",function(){window.removeEventListener("error",g,!1)})),b.exports=h},{"./core":50}],54:[function(a,b,c){function d(a,b,c){var d=b.bind(c);c.elt.addEventListener(a,d,!1),c._events[a]=d}var e=a("./core");e.Element=function(a,b){this.elt=a,this._pInst=b,this._events={},this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight},e.Element.prototype.parent=function(a){return 0===arguments.length?this.elt.parentNode:("string"==typeof a?("#"===a[0]&&(a=a.substring(1)),a=document.getElementById(a)):a instanceof e.Element&&(a=a.elt),a.appendChild(this.elt),this)},e.Element.prototype.id=function(a){return 0===arguments.length?this.elt.id:(this.elt.id=a,this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight,this)},e.Element.prototype["class"]=function(a){return 0===arguments.length?this.elt.className:(this.elt.className=a,this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight,this)},e.Element.prototype.mousePressed=function(a){return d("mousedown",a,this),d("touchstart",a,this),this},e.Element.prototype.mouseWheel=function(a){return d("wheel",a,this),this},e.Element.prototype.mouseReleased=function(a){return d("mouseup",a,this),d("touchend",a,this),this},e.Element.prototype.mouseClicked=function(a){return d("click",a,this),this},e.Element.prototype.mouseMoved=function(a){return d("mousemove",a,this),d("touchmove",a,this),this},e.Element.prototype.mouseOver=function(a){return d("mouseover",a,this),this},e.Element.prototype.changed=function(a){return d("change",a,this),this},e.Element.prototype.input=function(a){return d("input",a,this),this},e.Element.prototype.mouseOut=function(a){return d("mouseout",a,this),this},e.Element.prototype.touchStarted=function(a){return d("touchstart",a,this),d("mousedown",a,this),this},e.Element.prototype.touchMoved=function(a){return d("touchmove",a,this),d("mousemove",a,this),this},e.Element.prototype.touchEnded=function(a){return d("touchend",a,this),d("mouseup",a,this),this},e.Element.prototype.dragOver=function(a){return d("dragover",a,this),this},e.Element.prototype.dragLeave=function(a){return d("dragleave",a,this),this},e.Element.prototype.drop=function(a,b){function c(b){var c=new e.File(b);return function(b){c.data=b.target.result,a(c)}}return window.File&&window.FileReader&&window.FileList&&window.Blob?(d("dragover",function(a){a.stopPropagation(),a.preventDefault()},this),d("dragleave",function(a){a.stopPropagation(),a.preventDefault()},this),arguments.length>1&&d("drop",b,this),d("drop",function(a){a.stopPropagation(),a.preventDefault();for(var b=a.dataTransfer.files,d=0;d<b.length;d++){var e=b[d],f=new FileReader;f.onload=c(e),e.type.indexOf("text")>-1?f.readAsText(e):f.readAsDataURL(e)}},this)):console.log("The File APIs are not fully supported in this browser."),this},e.Element.prototype._setProperty=function(a,b){this[a]=b},b.exports=e.Element},{"./core":50}],55:[function(a,b,c){var d=a("./core"),e=a("./constants");d.Graphics=function(a,b,c,f){var g=c||e.P2D,h=document.createElement("canvas"),i=this._userNode||document.body;i.appendChild(h),d.Element.call(this,h,f,!1),this._styles=[],this.width=a,this.height=b,this._pixelDensity=f._pixelDensity,g===e.WEBGL?this._renderer=new d.Renderer3D(h,f,!1):this._renderer=new d.Renderer2D(h,f,!1),this._renderer.resize(a,b),this._renderer._applyDefaults(),f._elements.push(this);for(var j in d.prototype)this[j]||("function"==typeof d.prototype[j]?this[j]=d.prototype[j].bind(this):this[j]=d.prototype[j]);return this},d.Graphics.prototype=Object.create(d.Element.prototype),b.exports=d.Graphics},{"./constants":49,"./core":50}],56:[function(a,b,c){function d(a){var b=0,c=0;if(a.offsetParent){do b+=a.offsetLeft,c+=a.offsetTop;while(a=a.offsetParent)}else b+=a.offsetLeft,c+=a.offsetTop;return[b,c]}var e=a("./core"),f=a("../core/constants");e.Renderer=function(a,b,c){e.Element.call(this,a,b),this.canvas=a,this._pInst=b,c?(this._isMainCanvas=!0,this._pInst._setProperty("_curElement",this),this._pInst._setProperty("canvas",this.canvas),this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height)):(this.canvas.style.display="none",this._styles=[]),this._textSize=12,this._textLeading=15,this._textFont="sans-serif",this._textStyle=f.NORMAL,this._textAscent=null,this._textDescent=null,this._rectMode=f.CORNER,this._ellipseMode=f.CENTER,this._curveTightness=0,this._imageMode=f.CORNER,this._tint=null,this._doStroke=!0,this._doFill=!0,this._strokeSet=!1,this._fillSet=!1,this._colorMode=f.RGB,this._colorMaxes={rgb:[255,255,255,255],hsb:[360,100,100,1],hsl:[360,100,100,1]}},e.Renderer.prototype=Object.create(e.Element.prototype),e.Renderer.prototype.resize=function(a,b){this.width=a,this.height=b,this.elt.width=a*this._pInst._pixelDensity,this.elt.height=b*this._pInst._pixelDensity,this.elt.style.width=a+"px",this.elt.style.height=b+"px",this._isMainCanvas&&(this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height))},e.Renderer.prototype.textLeading=function(a){return arguments.length&&arguments[0]?(this._setProperty("_textLeading",a),this):this._textLeading},e.Renderer.prototype.textSize=function(a){return arguments.length&&arguments[0]?(this._setProperty("_textSize",a),this._setProperty("_textLeading",a*f._DEFAULT_LEADMULT),this._applyTextProperties()):this._textSize},e.Renderer.prototype.textStyle=function(a){return arguments.length&&arguments[0]?((a===f.NORMAL||a===f.ITALIC||a===f.BOLD)&&this._setProperty("_textStyle",a),this._applyTextProperties()):this._textStyle},e.Renderer.prototype.textAscent=function(){return null===this._textAscent&&this._updateTextMetrics(),this._textAscent},e.Renderer.prototype.textDescent=function(){return null===this._textDescent&&this._updateTextMetrics(),this._textDescent},e.Renderer.prototype._isOpenType=function(a){return a=a||this._textFont,"object"==typeof a&&a.font&&a.font.supported},e.Renderer.prototype._updateTextMetrics=function(){if(this._isOpenType())return this._setProperty("_textAscent",this._textFont._textAscent()),this._setProperty("_textDescent",this._textFont._textDescent()),this;var a=document.createElement("span");a.style.fontFamily=this._textFont,a.style.fontSize=this._textSize+"px",a.innerHTML="ABCjgq|";var b=document.createElement("div");b.style.display="inline-block",b.style.width="1px",b.style.height="0px";var c=document.createElement("div");c.appendChild(a),c.appendChild(b),c.style.height="0px",c.style.overflow="hidden",document.body.appendChild(c),b.style.verticalAlign="baseline";var e=d(b),f=d(a),g=e[1]-f[1];b.style.verticalAlign="bottom",e=d(b),f=d(a);var h=e[1]-f[1],i=h-g;return document.body.removeChild(c),this._setProperty("_textAscent",g),this._setProperty("_textDescent",i),this},b.exports=e.Renderer},{"../core/constants":49,"./core":50}],57:[function(a,b,c){var d=a("./core"),e=a("./canvas"),f=a("./constants"),g=a("../image/filters");a("./p5.Renderer");var h="rgba(0,0,0,0)";d.Renderer2D=function(a,b,c){return d.Renderer.call(this,a,b,c),this.drawingContext=this.canvas.getContext("2d"),this._pInst._setProperty("drawingContext",this.drawingContext),this},d.Renderer2D.prototype=Object.create(d.Renderer.prototype),d.Renderer2D.prototype._applyDefaults=function(){this.drawingContext.fillStyle=f._DEFAULT_FILL,this.drawingContext.strokeStyle=f._DEFAULT_STROKE,this.drawingContext.lineCap=f.ROUND,this.drawingContext.font="normal 12px sans-serif"},d.Renderer2D.prototype.resize=function(a,b){d.Renderer.prototype.resize.call(this,a,b),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity)},d.Renderer2D.prototype.background=function(){if(this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),arguments[0]instanceof d.Image)this._pInst.image(arguments[0],0,0,this.width,this.height);else{var a=this.drawingContext.fillStyle,b=this._pInst.color.apply(this._pInst,arguments),c=b.toString();this.drawingContext.fillStyle=c,this.drawingContext.fillRect(0,0,this.width,this.height),this.drawingContext.fillStyle=a}this.drawingContext.restore()},d.Renderer2D.prototype.clear=function(){this.drawingContext.clearRect(0,0,this.width,this.height)},d.Renderer2D.prototype.fill=function(){var a=this.drawingContext,b=this._pInst.color.apply(this._pInst,arguments);a.fillStyle=b.toString()},d.Renderer2D.prototype.stroke=function(){var a=this.drawingContext,b=this._pInst.color.apply(this._pInst,arguments);a.strokeStyle=b.toString()},d.Renderer2D.prototype.image=function(a,b,c,e,f,g,h,i,j){var k;try{this._tint&&(d.MediaElement&&a instanceof d.MediaElement&&a.loadPixels(),a.canvas&&(k=this._getTintedImageCanvas(a))),k||(k=a.canvas||a.elt),this.drawingContext.drawImage(k,b,c,e,f,g,h,i,j)}catch(l){if("NS_ERROR_NOT_AVAILABLE"!==l.name)throw l}},d.Renderer2D.prototype._getTintedImageCanvas=function(a){if(!a.canvas)return a;var b=g._toPixels(a.canvas),c=document.createElement("canvas");c.width=a.canvas.width,c.height=a.canvas.height;for(var d=c.getContext("2d"),e=d.createImageData(a.canvas.width,a.canvas.height),f=e.data,h=0;h<b.length;h+=4){var i=b[h],j=b[h+1],k=b[h+2],l=b[h+3];f[h]=i*this._tint[0]/255,f[h+1]=j*this._tint[1]/255,f[h+2]=k*this._tint[2]/255,f[h+3]=l*this._tint[3]/255}return d.putImageData(e,0,0),c},d.Renderer2D.prototype.blendMode=function(a){this.drawingContext.globalCompositeOperation=a},d.Renderer2D.prototype.blend=function(){var a=this.drawingContext.globalCompositeOperation,b=arguments[arguments.length-1],c=Array.prototype.slice.call(arguments,0,arguments.length-1);this.drawingContext.globalCompositeOperation=b,this._pInst.copy.apply(this._pInst,c),this.drawingContext.globalCompositeOperation=a},d.Renderer2D.prototype.copy=function(){var a,b,c,e,f,g,h,i,j;if(9===arguments.length)a=arguments[0],b=arguments[1],c=arguments[2],e=arguments[3],f=arguments[4],g=arguments[5],h=arguments[6],i=arguments[7],j=arguments[8];else{if(8!==arguments.length)throw new Error("Signature not supported");a=this._pInst,b=arguments[0],c=arguments[1],e=arguments[2],f=arguments[3],g=arguments[4],h=arguments[5],i=arguments[6],j=arguments[7]}d.Renderer2D._copyHelper(a,b,c,e,f,g,h,i,j)},d.Renderer2D._copyHelper=function(a,b,c,d,e,f,g,h,i){var j=a.canvas.width/a.width;this.drawingContext.drawImage(a.canvas,j*b,j*c,j*d,j*e,f,g,h,i)},d.Renderer2D.prototype.get=function(a,b,c,e){if(void 0===a&&void 0===b&&void 0===c&&void 0===e?(a=0,b=0,c=this.width,e=this.height):void 0===c&&void 0===e&&(c=1,e=1),0>a+c||0>b+e||a>this.width||b>this.height)return[0,0,0,255];var f=this._pInst||this,g=f._pixelDensity;if(this.loadPixels.call(f),a=Math.floor(a),b=Math.floor(b),1===c&&1===e)return[f.pixels[4*g*(b*this.width+a)],f.pixels[g*(4*(b*this.width+a)+1)],f.pixels[g*(4*(b*this.width+a)+2)],f.pixels[g*(4*(b*this.width+a)+3)]];var h=a*g,i=b*g,j=Math.min(c,f.width),k=Math.min(e,f.height),l=j*g,m=k*g,n=new d.Image(j,k);return n.canvas.getContext("2d").drawImage(this.canvas,h,i,l,m,0,0,j,k),n},d.Renderer2D.prototype.loadPixels=function(){var a=this._pixelDensity||this._pInst._pixelDensity,b=this.width*a,c=this.height*a,d=this.drawingContext.getImageData(0,0,b,c);this._pInst?(this._pInst._setProperty("imageData",d),this._pInst._setProperty("pixels",d.data)):(this._setProperty("imageData",d),this._setProperty("pixels",d.data))},d.Renderer2D.prototype.set=function(a,b,c){if(a=Math.floor(a),b=Math.floor(b),c instanceof d.Image)this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),this.drawingContext.drawImage(c.canvas,a,b),this.loadPixels.call(this._pInst),this.drawingContext.restore();else{var e=this._pInst||this,f=0,g=0,h=0,i=0,j=4*(b*e._pixelDensity*this.width*e._pixelDensity+a*e._pixelDensity);if(e.imageData||e.loadPixels.call(e),"number"==typeof c)j<e.pixels.length&&(f=c,g=c,h=c,i=255);else if(c instanceof Array){if(c.length<4)throw new Error("pixel array must be of the form [R, G, B, A]");j<e.pixels.length&&(f=c[0],g=c[1],h=c[2],i=c[3])}else c instanceof d.Color&&j<e.pixels.length&&(f=c.levels[0],g=c.levels[1],h=c.levels[2],i=c.levels[3]);for(var k=0;k<e._pixelDensity;k++)for(var l=0;l<e._pixelDensity;l++)j=4*((b*e._pixelDensity+l)*this.width*e._pixelDensity+(a*e._pixelDensity+k)),e.pixels[j]=f,e.pixels[j+1]=g,e.pixels[j+2]=h,e.pixels[j+3]=i}},d.Renderer2D.prototype.updatePixels=function(a,b,c,d){var e=this._pixelDensity||this._pInst._pixelDensity;void 0===a&&void 0===b&&void 0===c&&void 0===d&&(a=0,b=0,c=this.width,d=this.height),c*=e,d*=e,this._pInst?this.drawingContext.putImageData(this._pInst.imageData,a,b,0,0,c,d):this.drawingContext.putImageData(this.imageData,a,b,0,0,c,d)},d.Renderer2D.prototype._acuteArcToBezier=function(a,b){var c=b/2,d=Math.cos(c),e=Math.sin(c),f=1/Math.tan(c),g=a+c,h=Math.cos(g),i=Math.sin(g),j=(4-d)/3,k=e+(d-j)*f;return{ax:Math.cos(a),ay:Math.sin(a),bx:j*h+k*i,by:j*i-k*h,cx:j*h-k*i,cy:j*i+k*h,dx:Math.cos(a+b),dy:Math.sin(a+b)}},d.Renderer2D.prototype.arc=function(a,b,c,d,g,h,i){for(var j=this.drawingContext,k=e.arcModeAdjust(a,b,c,d,this._ellipseMode),l=k.w/2,m=k.h/2,n=1e-5,o=0,p=[];h-g>n;)o=Math.min(h-g,f.HALF_PI),p.push(this._acuteArcToBezier(g,o)),g+=o;return this._doFill&&(j.beginPath(),p.forEach(function(a,b){0===b&&j.moveTo(k.x+a.ax*l,k.y+a.ay*m),j.bezierCurveTo(k.x+a.bx*l,k.y+a.by*m,k.x+a.cx*l,k.y+a.cy*m,k.x+a.dx*l,k.y+a.dy*m)}),(i===f.PIE||null==i)&&j.lineTo(k.x,k.y),j.closePath(),j.fill()),this._doStroke&&(j.beginPath(),p.forEach(function(a,b){0===b&&j.moveTo(k.x+a.ax*l,k.y+a.ay*m),j.bezierCurveTo(k.x+a.bx*l,k.y+a.by*m,k.x+a.cx*l,k.y+a.cy*m,k.x+a.dx*l,k.y+a.dy*m)}),i===f.PIE?(j.lineTo(k.x,k.y),j.closePath()):i===f.CHORD&&j.closePath(),j.stroke()),this},d.Renderer2D.prototype.ellipse=function(a,b,c,d){var f=this.drawingContext,g=this._doFill,i=this._doStroke;if(g&&!i){if(f.fillStyle===h)return this}else if(!g&&i&&f.strokeStyle===h)return this;var j=e.modeAdjust(a,b,c,d,this._ellipseMode),k=.5522847498,l=j.w/2*k,m=j.h/2*k,n=j.x+j.w,o=j.y+j.h,p=j.x+j.w/2,q=j.y+j.h/2;f.beginPath(),f.moveTo(j.x,q),f.bezierCurveTo(j.x,q-m,p-l,j.y,p,j.y),f.bezierCurveTo(p+l,j.y,n,q-m,n,q),f.bezierCurveTo(n,q+m,p+l,o,p,o),f.bezierCurveTo(p-l,o,j.x,q+m,j.x,q),f.closePath(),g&&f.fill(),i&&f.stroke()},d.Renderer2D.prototype.line=function(a,b,c,d){var e=this.drawingContext;return this._doStroke?e.strokeStyle===h?this:(e.lineWidth%2===1&&e.translate(.5,.5),e.beginPath(),e.moveTo(a,b),e.lineTo(c,d),e.stroke(),e.lineWidth%2===1&&e.translate(-.5,-.5),this):this},d.Renderer2D.prototype.point=function(a,b){var c=this.drawingContext,d=c.strokeStyle,e=c.fillStyle;return this._doStroke?c.strokeStyle===h?this:(a=Math.round(a),b=Math.round(b),c.fillStyle=d,c.lineWidth>1?(c.beginPath(),c.arc(a,b,c.lineWidth/2,0,f.TWO_PI,!1),c.fill()):c.fillRect(a,b,1,1),void(c.fillStyle=e)):this},d.Renderer2D.prototype.quad=function(a,b,c,d,e,f,g,i){var j=this.drawingContext,k=this._doFill,l=this._doStroke;if(k&&!l){if(j.fillStyle===h)return this}else if(!k&&l&&j.strokeStyle===h)return this;return j.beginPath(),j.moveTo(a,b),j.lineTo(c,d),j.lineTo(e,f),j.lineTo(g,i),j.closePath(),k&&j.fill(),l&&j.stroke(),this},d.Renderer2D.prototype.rect=function(a,b,c,d,f,g,i,j){var k=this.drawingContext,l=this._doFill,m=this._doStroke;if(l&&!m){if(k.fillStyle===h)return this}else if(!l&&m&&k.strokeStyle===h)return this;var n=e.modeAdjust(a,b,c,d,this._rectMode);if(this._doStroke&&k.lineWidth%2===1&&k.translate(.5,.5),k.beginPath(),"undefined"==typeof f)k.rect(n.x,n.y,n.w,n.h);else{"undefined"==typeof g&&(g=f),"undefined"==typeof i&&(i=g),"undefined"==typeof j&&(j=i);var o=n.x,p=n.y,q=n.w,r=n.h,s=q/2,t=r/2;2*f>q&&(f=s),2*f>r&&(f=t),2*g>q&&(g=s),2*g>r&&(g=t),2*i>q&&(i=s),2*i>r&&(i=t),2*j>q&&(j=s),2*j>r&&(j=t),k.beginPath(),k.moveTo(o+f,p),k.arcTo(o+q,p,o+q,p+r,g),k.arcTo(o+q,p+r,o,p+r,i),k.arcTo(o,p+r,o,p,j),k.arcTo(o,p,o+q,p,f),k.closePath()}return this._doFill&&k.fill(),this._doStroke&&k.stroke(),this._doStroke&&k.lineWidth%2===1&&k.translate(-.5,-.5),this},d.Renderer2D.prototype.triangle=function(a,b,c,d,e,f){var g=this.drawingContext,i=this._doFill,j=this._doStroke;if(i&&!j){if(g.fillStyle===h)return this}else if(!i&&j&&g.strokeStyle===h)return this;g.beginPath(),g.moveTo(a,b),g.lineTo(c,d),g.lineTo(e,f),g.closePath(),i&&g.fill(),j&&g.stroke()},d.Renderer2D.prototype.endShape=function(a,b,c,d,e,g,h){if(0===b.length)return this;if(!this._doStroke&&!this._doFill)return this;var i,j=a===f.CLOSE;j&&!g&&b.push(b[0]);var k,l,m=b.length;if(!c||h!==f.POLYGON&&null!==h)if(!d||h!==f.POLYGON&&null!==h)if(!e||h!==f.POLYGON&&null!==h)if(h===f.POINTS)for(k=0;m>k;k++)i=b[k],this._doStroke&&this._pInst.stroke(i[6]),this._pInst.point(i[0],i[1]);else if(h===f.LINES)for(k=0;m>k+1;k+=2)i=b[k],this._doStroke&&this._pInst.stroke(b[k+1][6]),this._pInst.line(i[0],i[1],b[k+1][0],b[k+1][1]);else if(h===f.TRIANGLES)for(k=0;m>k+2;k+=3)i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(b[k+2][0],b[k+2][1]),this.drawingContext.lineTo(i[0],i[1]),this._doFill&&(this._pInst.fill(b[k+2][5]),this.drawingContext.fill()),this._doStroke&&(this._pInst.stroke(b[k+2][6]),this.drawingContext.stroke()),this.drawingContext.closePath();else if(h===f.TRIANGLE_STRIP)for(k=0;m>k+1;k++)i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(i[0],i[1]),this._doStroke&&this._pInst.stroke(b[k+1][6]),this._doFill&&this._pInst.fill(b[k+1][5]),m>k+2&&(this.drawingContext.lineTo(b[k+2][0],b[k+2][1]),this._doStroke&&this._pInst.stroke(b[k+2][6]),this._doFill&&this._pInst.fill(b[k+2][5])),this._doFillStrokeClose();else if(h===f.TRIANGLE_FAN){if(m>2)for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),this.drawingContext.lineTo(b[1][0],b[1][1]),this.drawingContext.lineTo(b[2][0],b[2][1]),this._doFill&&this._pInst.fill(b[2][5]),this._doStroke&&this._pInst.stroke(b[2][6]),this._doFillStrokeClose(),k=3;m>k;k++)i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),this.drawingContext.lineTo(b[k-1][0],b[k-1][1]),this.drawingContext.lineTo(i[0],i[1]),this._doFill&&this._pInst.fill(i[5]),this._doStroke&&this._pInst.stroke(i[6]),this._doFillStrokeClose()}else if(h===f.QUADS)for(k=0;m>k+3;k+=4){for(i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(i[0],i[1]),l=1;4>l;l++)this.drawingContext.lineTo(b[k+l][0],b[k+l][1]);this.drawingContext.lineTo(i[0],i[1]),this._doFill&&this._pInst.fill(b[k+3][5]),this._doStroke&&this._pInst.stroke(b[k+3][6]),this._doFillStrokeClose()}else if(h===f.QUAD_STRIP){if(m>3)for(k=0;m>k+1;k+=2)i=b[k],this.drawingContext.beginPath(),m>k+3?(this.drawingContext.moveTo(b[k+2][0],b[k+2][1]),this.drawingContext.lineTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(b[k+3][0],b[k+3][1]),this._doFill&&this._pInst.fill(b[k+3][5]),this._doStroke&&this._pInst.stroke(b[k+3][6])):(this.drawingContext.moveTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1])),this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),k=1;m>k;k++)i=b[k],i.isVert&&(i.moveTo?this.drawingContext.moveTo(i[0],i[1]):this.drawingContext.lineTo(i[0],i[1]));this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),k=0;m>k;k++)b[k].isVert?b[k].moveTo?this.drawingContext.moveTo([0],b[k][1]):this.drawingContext.lineTo(b[k][0],b[k][1]):this.drawingContext.quadraticCurveTo(b[k][0],b[k][1],b[k][2],b[k][3]);this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),k=0;m>k;k++)b[k].isVert?b[k].moveTo?this.drawingContext.moveTo(b[k][0],b[k][1]):this.drawingContext.lineTo(b[k][0],b[k][1]):this.drawingContext.bezierCurveTo(b[k][0],b[k][1],b[k][2],b[k][3],b[k][4],b[k][5]);this._doFillStrokeClose()}else if(m>3){var n=[],o=1-this._curveTightness;for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[1][0],b[1][1]),k=1;m>k+2;k++)i=b[k],n[0]=[i[0],i[1]],n[1]=[i[0]+(o*b[k+1][0]-o*b[k-1][0])/6,i[1]+(o*b[k+1][1]-o*b[k-1][1])/6],n[2]=[b[k+1][0]+(o*b[k][0]-o*b[k+2][0])/6,b[k+1][1]+(o*b[k][1]-o*b[k+2][1])/6],n[3]=[b[k+1][0],b[k+1][1]],this.drawingContext.bezierCurveTo(n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]);j&&this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this._doFillStrokeClose()}return c=!1,d=!1,e=!1,g=!1,j&&b.pop(),this},d.Renderer2D.prototype.noSmooth=function(){return"imageSmoothingEnabled"in this.drawingContext?this.drawingContext.imageSmoothingEnabled=!1:"mozImageSmoothingEnabled"in this.drawingContext?this.drawingContext.mozImageSmoothingEnabled=!1:"webkitImageSmoothingEnabled"in this.drawingContext?this.drawingContext.webkitImageSmoothingEnabled=!1:"msImageSmoothingEnabled"in this.drawingContext&&(this.drawingContext.msImageSmoothingEnabled=!1),this},d.Renderer2D.prototype.smooth=function(){return"imageSmoothingEnabled"in this.drawingContext?this.drawingContext.imageSmoothingEnabled=!0:"mozImageSmoothingEnabled"in this.drawingContext?this.drawingContext.mozImageSmoothingEnabled=!0:"webkitImageSmoothingEnabled"in this.drawingContext?this.drawingContext.webkitImageSmoothingEnabled=!0:"msImageSmoothingEnabled"in this.drawingContext&&(this.drawingContext.msImageSmoothingEnabled=!0),this},d.Renderer2D.prototype.strokeCap=function(a){return(a===f.ROUND||a===f.SQUARE||a===f.PROJECT)&&(this.drawingContext.lineCap=a),this},d.Renderer2D.prototype.strokeJoin=function(a){return(a===f.ROUND||a===f.BEVEL||a===f.MITER)&&(this.drawingContext.lineJoin=a),this},d.Renderer2D.prototype.strokeWeight=function(a){return"undefined"==typeof a||0===a?this.drawingContext.lineWidth=1e-4:this.drawingContext.lineWidth=a,this},d.Renderer2D.prototype._getFill=function(){return this.drawingContext.fillStyle},d.Renderer2D.prototype._getStroke=function(){return this.drawingContext.strokeStyle},d.Renderer2D.prototype.bezier=function(a,b,c,d,e,f,g,h){return this._pInst.beginShape(),this._pInst.vertex(a,b),this._pInst.bezierVertex(c,d,e,f,g,h),this._pInst.endShape(),this},d.Renderer2D.prototype.curve=function(a,b,c,d,e,f,g,h){return this._pInst.beginShape(),this._pInst.curveVertex(a,b),this._pInst.curveVertex(c,d),this._pInst.curveVertex(e,f),this._pInst.curveVertex(g,h),this._pInst.endShape(),this},d.Renderer2D.prototype._doFillStrokeClose=function(){this._doFill&&this.drawingContext.fill(),this._doStroke&&this.drawingContext.stroke(),this.drawingContext.closePath()},d.Renderer2D.prototype.applyMatrix=function(a,b,c,d,e,f){this.drawingContext.transform(a,b,c,d,e,f)},d.Renderer2D.prototype.resetMatrix=function(){return this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),this},d.Renderer2D.prototype.rotate=function(a){this.drawingContext.rotate(a)},d.Renderer2D.prototype.scale=function(a,b){return this.drawingContext.scale(a,b),this},d.Renderer2D.prototype.shearX=function(a){return this._pInst._angleMode===f.DEGREES&&(a=this._pInst.radians(a)),this.drawingContext.transform(1,0,this._pInst.tan(a),1,0,0),this},d.Renderer2D.prototype.shearY=function(a){return this._pInst._angleMode===f.DEGREES&&(a=this._pInst.radians(a)),this.drawingContext.transform(1,this._pInst.tan(a),0,1,0,0),this},d.Renderer2D.prototype.translate=function(a,b){return this.drawingContext.translate(a,b),this},d.Renderer2D.prototype.text=function(a,b,c,d,e){var g,h,i,j,k,l,m,n,o,p,q=this._pInst,r=Number.MAX_VALUE;if(this._doFill||this._doStroke){if("string"!=typeof a&&(a=a.toString()),a=a.replace(/(\t)/g,"  "),g=a.split("\n"),"undefined"!=typeof d){for(o=0,i=0;i<g.length;i++)for(k="",n=g[i].split(" "),h=0;h<n.length;h++)l=k+n[h]+" ",m=this.textWidth(l),
m>d?(k=n[h]+" ",o+=q.textLeading()):k=l;switch(this._rectMode===f.CENTER&&(b-=d/2,c-=e/2),this.drawingContext.textAlign){case f.CENTER:b+=d/2;break;case f.RIGHT:b+=d}if("undefined"!=typeof e){switch(this.drawingContext.textBaseline){case f.BOTTOM:c+=e-o;break;case f._CTX_MIDDLE:c+=(e-o)/2;break;case f.BASELINE:p=!0,this.drawingContext.textBaseline=f.TOP}r=c+e-q.textAscent()}for(i=0;i<g.length;i++){for(k="",n=g[i].split(" "),h=0;h<n.length;h++)l=k+n[h]+" ",m=this.textWidth(l),m>d&&k.length>0?(this._renderText(q,k,b,c,r),k=n[h]+" ",c+=q.textLeading()):k=l;this._renderText(q,k,b,c,r),c+=q.textLeading()}}else for(j=0;j<g.length;j++)this._renderText(q,g[j],b,c,r),c+=q.textLeading();return p&&(this.drawingContext.textBaseline=f.BASELINE),q}},d.Renderer2D.prototype._renderText=function(a,b,c,d,e){return d>=e?void 0:(a.push(),this._isOpenType()?this._textFont._renderPath(b,c,d,{renderer:this}):(this._doStroke&&this._strokeSet&&this.drawingContext.strokeText(b,c,d),this._doFill&&(this.drawingContext.fillStyle=this._fillSet?this.drawingContext.fillStyle:f._DEFAULT_TEXT_FILL,this.drawingContext.fillText(b,c,d))),a.pop(),a)},d.Renderer2D.prototype.textWidth=function(a){return this._isOpenType()?this._textFont._textWidth(a):this.drawingContext.measureText(a).width},d.Renderer2D.prototype.textAlign=function(a,b){if(arguments.length)return(a===f.LEFT||a===f.RIGHT||a===f.CENTER)&&(this.drawingContext.textAlign=a),(b===f.TOP||b===f.BOTTOM||b===f.CENTER||b===f.BASELINE)&&(b===f.CENTER?this.drawingContext.textBaseline=f._CTX_MIDDLE:this.drawingContext.textBaseline=b),this._pInst;var c=this.drawingContext.textBaseline;return c===f._CTX_MIDDLE&&(c=f.CENTER),{horizontal:this.drawingContext.textAlign,vertical:c}},d.Renderer2D.prototype._applyTextProperties=function(){var a,b=this._pInst;return this._setProperty("_textAscent",null),this._setProperty("_textDescent",null),a=this._textFont,this._isOpenType()&&(a=this._textFont.font.familyName,this._setProperty("_textStyle",this._textFont.font.styleName)),this.drawingContext.font=this._textStyle+" "+this._textSize+"px "+a,b},d.Renderer2D.prototype.push=function(){this.drawingContext.save()},d.Renderer2D.prototype.pop=function(){this.drawingContext.restore()},b.exports=d.Renderer2D},{"../image/filters":67,"./canvas":48,"./constants":49,"./core":50,"./p5.Renderer":56}],58:[function(a,b,c){var d=a("./core"),e=a("./constants");a("./p5.Graphics"),a("./p5.Renderer2D"),a("../3d/p5.Renderer3D");var f="defaultCanvas0";d.prototype.createCanvas=function(a,b,c){var g,h,i=c||e.P2D;if(arguments[3]&&(g="boolean"==typeof arguments[3]?arguments[3]:!1),i===e.WEBGL)h=document.getElementById(f),h&&h.parentNode.removeChild(h),h=document.createElement("canvas"),h.id=f;else if(g){h=document.createElement("canvas");for(var j=0;document.getElementById("defaultCanvas"+j);)j++;f="defaultCanvas"+j,h.id=f}else h=this.canvas;return this._setupDone||(h.className+=" p5_hidden",h.style.visibility="hidden"),this._userNode?this._userNode.appendChild(h):document.body.appendChild(h),i===e.WEBGL?(this._setProperty("_renderer",new d.Renderer3D(h,this,!0)),this._isdefaultGraphics=!0):this._isdefaultGraphics||(this._setProperty("_renderer",new d.Renderer2D(h,this,!0)),this._isdefaultGraphics=!0),this._renderer.resize(a,b),this._renderer._applyDefaults(),g&&this._elements.push(this._renderer),this._renderer},d.prototype.resizeCanvas=function(a,b,c){if(this._renderer){var d={};for(var e in this.drawingContext){var f=this.drawingContext[e];"object"!=typeof f&&"function"!=typeof f&&(d[e]=f)}this._renderer.resize(a,b);for(var g in d)this.drawingContext[g]=d[g];c||this.redraw()}},d.prototype.noCanvas=function(){this.canvas&&this.canvas.parentNode.removeChild(this.canvas)},d.prototype.createGraphics=function(a,b,c){return new d.Graphics(a,b,c,this)},d.prototype.blendMode=function(a){if(a!==e.BLEND&&a!==e.DARKEST&&a!==e.LIGHTEST&&a!==e.DIFFERENCE&&a!==e.MULTIPLY&&a!==e.EXCLUSION&&a!==e.SCREEN&&a!==e.REPLACE&&a!==e.OVERLAY&&a!==e.HARD_LIGHT&&a!==e.SOFT_LIGHT&&a!==e.DODGE&&a!==e.BURN&&a!==e.ADD&&a!==e.NORMAL)throw new Error("Mode "+a+" not recognized.");this._renderer.blendMode(a)},b.exports=d},{"../3d/p5.Renderer3D":38,"./constants":49,"./core":50,"./p5.Graphics":55,"./p5.Renderer2D":57}],59:[function(a,b,c){window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a,b){window.setTimeout(a,1e3/60)}}(),window.performance=window.performance||{},window.performance.now=function(){var a=Date.now();return window.performance.now||window.performance.mozNow||window.performance.msNow||window.performance.oNow||window.performance.webkitNow||function(){return Date.now()-a}}(),function(){"use strict";"undefined"!=typeof Uint8ClampedArray&&(Uint8ClampedArray.prototype.slice=Array.prototype.slice)}()},{}],60:[function(a,b,c){"use strict";var d=a("./core");d.prototype.exit=function(){throw"exit() not implemented, see remove()"},d.prototype.noLoop=function(){this._loop=!1},d.prototype.loop=function(){this._loop=!0,this._draw()},d.prototype.push=function(){this._renderer.push(),this._styles.push({_doStroke:this._renderer._doStroke,_doFill:this._renderer._doFill,_tint:this._renderer._tint,_imageMode:this._renderer._imageMode,_rectMode:this._renderer._rectMode,_ellipseMode:this._renderer._ellipseMode,_colorMode:this._renderer._colorMode,_textFont:this._renderer._textFont,_textLeading:this._renderer._textLeading,_textSize:this._renderer._textSize,_textStyle:this._renderer._textStyle})},d.prototype.pop=function(){this._renderer.pop();var a=this._styles.pop();for(var b in a)this._renderer[b]=a[b]},d.prototype.pushStyle=function(){throw new Error("pushStyle() not used, see push()")},d.prototype.popStyle=function(){throw new Error("popStyle() not used, see pop()")},d.prototype.redraw=function(){var a=this.setup||window.setup,b=this.draw||window.draw;if("function"==typeof b){this.push(),"undefined"==typeof a&&this.scale(this._pixelDensity,this._pixelDensity);var c=this;this._registeredMethods.pre.forEach(function(a){a.call(c)}),b(),this._registeredMethods.post.forEach(function(a){a.call(c)}),this.pop()}},d.prototype.size=function(){var a="size() is not a valid p5 function, to set the size of the ";throw a+="drawing canvas, please use createCanvas() instead"},b.exports=d},{"./core":50}],61:[function(a,b,c){"use strict";var d=a("./core"),e=a("./constants");d.prototype.applyMatrix=function(a,b,c,d,e,f){return this._renderer.applyMatrix(a,b,c,d,e,f),this},d.prototype.popMatrix=function(){throw new Error("popMatrix() not used, see pop()")},d.prototype.printMatrix=function(){throw new Error("printMatrix() not implemented")},d.prototype.pushMatrix=function(){throw new Error("pushMatrix() not used, see push()")},d.prototype.resetMatrix=function(){return this._renderer.resetMatrix(),this},d.prototype.rotate=function(){var a=arguments[0];return this._angleMode===e.DEGREES&&(a=this.radians(a)),arguments.length>1?this._renderer.rotate(a,arguments[1]):this._renderer.rotate(a),this},d.prototype.rotateX=function(a){for(var b=new Array(arguments.length),c=0;c<b.length;++c)b[c]=arguments[c];if(!this._renderer.isP3D)throw"not supported in p2d. Please use webgl mode";return this._validateParameters("rotateX",b,[["Number"]]),this._renderer.rotateX(a),this},d.prototype.rotateY=function(a){if(!this._renderer.isP3D)throw"not supported in p2d. Please use webgl mode";for(var b=new Array(arguments.length),c=0;c<b.length;++c)b[c]=arguments[c];return this._validateParameters("rotateY",b,[["Number"]]),this._renderer.rotateY(a),this},d.prototype.rotateZ=function(a){if(!this._renderer.isP3D)throw"not supported in p2d. Please use webgl mode";for(var b=new Array(arguments.length),c=0;c<b.length;++c)b[c]=arguments[c];return this._validateParameters("rotateZ",b,[["Number"]]),this._renderer.rotateZ(a),this},d.prototype.scale=function(){for(var a,b,c,e=new Array(arguments.length),f=0;f<e.length;f++)e[f]=arguments[f];return e[0]instanceof d.Vector?(a=e[0].x,b=e[0].y,c=e[0].z):e[0]instanceof Array?(a=e[0][0],b=e[0][1],c=e[0][2]||1):1===e.length?a=b=c=e[0]:(a=e[0],b=e[1],c=e[2]||1),this._renderer.isP3D?this._renderer.scale.call(this._renderer,a,b,c):this._renderer.scale.call(this._renderer,a,b),this},d.prototype.shearX=function(a){return this._angleMode===e.DEGREES&&(a=this.radians(a)),this._renderer.shearX(a),this},d.prototype.shearY=function(a){return this._angleMode===e.DEGREES&&(a=this.radians(a)),this._renderer.shearY(a),this},d.prototype.translate=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e)d[e]=arguments[e];return this._renderer.isP3D?(this._validateParameters("translate",d,[["Number","Number","Number"]]),this._renderer.translate(a,b,c)):(this._validateParameters("translate",d,[["Number","Number"]]),this._renderer.translate(a,b)),this},b.exports=d},{"./constants":49,"./core":50}],62:[function(a,b,c){"use strict";var d=a("./core"),e=a("./constants"),f=null,g=[],h=[],i=!1,j=!1,k=!1,l=!1;d.prototype.beginContour=function(){return h=[],l=!0,this},d.prototype.beginShape=function(a){return f=a===e.POINTS||a===e.LINES||a===e.TRIANGLES||a===e.TRIANGLE_FAN||a===e.TRIANGLE_STRIP||a===e.QUADS||a===e.QUAD_STRIP?a:null,this._renderer.isP3D?this._renderer.beginShape(a):(g=[],h=[]),this},d.prototype.bezierVertex=function(a,b,c,d,e,f){if(0===g.length)throw"vertex() must be used once before calling bezierVertex()";i=!0;for(var j=[],k=0;k<arguments.length;k++)j[k]=arguments[k];return j.isVert=!1,l?h.push(j):g.push(j),this},d.prototype.curveVertex=function(a,b){return j=!0,this.vertex(a,b),this},d.prototype.endContour=function(){var a=h[0].slice();a.isVert=h[0].isVert,a.moveTo=!1,h.push(a),g.push(g[0]);for(var b=0;b<h.length;b++)g.push(h[b]);return this},d.prototype.endShape=function(a){if(this._renderer.isP3D)this._renderer.endShape();else{if(0===g.length)return this;if(!this._renderer._doStroke&&!this._renderer._doFill)return this;var b=a===e.CLOSE;b&&!l&&g.push(g[0]),this._renderer.endShape(a,g,j,i,k,l,f),j=!1,i=!1,k=!1,l=!1,b&&g.pop()}return this},d.prototype.quadraticVertex=function(a,b,c,d){if(this._contourInited){var f={};return f.x=a,f.y=b,f.x3=c,f.y3=d,f.type=e.QUADRATIC,this._contourVertices.push(f),this}if(!(g.length>0))throw"vertex() must be used once before calling quadraticVertex()";k=!0;for(var i=[],j=0;j<arguments.length;j++)i[j]=arguments[j];return i.isVert=!1,l?h.push(i):g.push(i),this},d.prototype.vertex=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e)d[e]=arguments[e];if(this._renderer.isP3D)this._validateParameters("vertex",d,[["Number","Number","Number"]]),this._renderer.vertex(arguments[0],arguments[1],arguments[2]);else{this._validateParameters("vertex",d,[["Number","Number"],["Number","Number","Number"]]);var f=[];f.isVert=!0,f[0]=a,f[1]=b,f[2]=0,f[3]=0,f[4]=0,f[5]=this._renderer._getFill(),f[6]=this._renderer._getStroke(),c&&(f.moveTo=c),l?(0===h.length&&(f.moveTo=!0),h.push(f)):g.push(f)}return this},b.exports=d},{"./constants":49,"./core":50}],63:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.deviceOrientation=void 0,d.prototype.accelerationX=0,d.prototype.accelerationY=0,d.prototype.accelerationZ=0,d.prototype.pAccelerationX=0,d.prototype.pAccelerationY=0,d.prototype.pAccelerationZ=0,d.prototype._updatePAccelerations=function(){this._setProperty("pAccelerationX",this.accelerationX),this._setProperty("pAccelerationY",this.accelerationY),this._setProperty("pAccelerationZ",this.accelerationZ)},d.prototype.rotationX=0,d.prototype.rotationY=0,d.prototype.rotationZ=0,d.prototype.pRotationX=0,d.prototype.pRotationY=0,d.prototype.pRotationZ=0;var e,f,g,h=0,i=0,j=0,k="clockwise",l="clockwise",m="clockwise";d.prototype._updatePRotations=function(){this._setProperty("pRotationX",this.rotationX),this._setProperty("pRotationY",this.rotationY),this._setProperty("pRotationZ",this.rotationZ)},d.prototype.turnAxis=void 0;var n=.5,o=30;d.prototype.setMoveThreshold=function(a){"number"==typeof a&&(n=a)},d.prototype.setShakeThreshold=function(a){"number"==typeof a&&(o=a)},d.prototype._ondeviceorientation=function(a){this._updatePRotations(),this._setProperty("rotationX",a.beta),this._setProperty("rotationY",a.gamma),this._setProperty("rotationZ",a.alpha),this._handleMotion()},d.prototype._ondevicemotion=function(a){this._updatePAccelerations(),this._setProperty("accelerationX",2*a.acceleration.x),this._setProperty("accelerationY",2*a.acceleration.y),this._setProperty("accelerationZ",2*a.acceleration.z),this._handleMotion()},d.prototype._handleMotion=function(){90===window.orientation||-90===window.orientation?this._setProperty("deviceOrientation","landscape"):0===window.orientation?this._setProperty("deviceOrientation","portrait"):void 0===window.orientation&&this._setProperty("deviceOrientation","undefined");var a=this.deviceMoved||window.deviceMoved;"function"==typeof a&&(Math.abs(this.accelerationX-this.pAccelerationX)>n||Math.abs(this.accelerationY-this.pAccelerationY)>n||Math.abs(this.accelerationZ-this.pAccelerationZ)>n)&&a();var b=this.deviceTurned||window.deviceTurned;if("function"==typeof b){var c=this.rotationX+180,d=this.pRotationX+180,p=h+180;c-d>0&&270>c-d||-270>c-d?k="clockwise":(0>c-d||c-d>270)&&(k="counter-clockwise"),k!==e&&(p=c),Math.abs(c-p)>90&&Math.abs(c-p)<270&&(p=c,this._setProperty("turnAxis","X"),b()),e=k,h=p-180;var q=this.rotationY+180,r=this.pRotationY+180,s=i+180;q-r>0&&270>q-r||-270>q-r?l="clockwise":(0>q-r||q-this.pRotationY>270)&&(l="counter-clockwise"),l!==f&&(s=q),Math.abs(q-s)>90&&Math.abs(q-s)<270&&(s=q,this._setProperty("turnAxis","Y"),b()),f=l,i=s-180,this.rotationZ-this.pRotationZ>0&&this.rotationZ-this.pRotationZ<270||this.rotationZ-this.pRotationZ<-270?m="clockwise":(this.rotationZ-this.pRotationZ<0||this.rotationZ-this.pRotationZ>270)&&(m="counter-clockwise"),m!==g&&(j=this.rotationZ),Math.abs(this.rotationZ-j)>90&&Math.abs(this.rotationZ-j)<270&&(j=this.rotationZ,this._setProperty("turnAxis","Z"),b()),g=m,this._setProperty("turnAxis",void 0)}var t=this.deviceShaken||window.deviceShaken;if("function"==typeof t){var u,v;null!==this.pAccelerationX&&(u=Math.abs(this.accelerationX-this.pAccelerationX),v=Math.abs(this.accelerationY-this.pAccelerationY)),u+v>o&&t()}},b.exports=d},{"../core/core":50}],64:[function(a,b,c){"use strict";var d=a("../core/core"),e={};d.prototype.isKeyPressed=!1,d.prototype.keyIsPressed=!1,d.prototype.key="",d.prototype.keyCode=0,d.prototype._onkeydown=function(a){this._setProperty("isKeyPressed",!0),this._setProperty("keyIsPressed",!0),this._setProperty("keyCode",a.which),e[a.which]=!0;var b=String.fromCharCode(a.which);b||(b=a.which),this._setProperty("key",b);var c=this.keyPressed||window.keyPressed;if("function"==typeof c&&!a.charCode){var d=c(a);d===!1&&a.preventDefault()}},d.prototype._onkeyup=function(a){var b=this.keyReleased||window.keyReleased;this._setProperty("isKeyPressed",!1),this._setProperty("keyIsPressed",!1),e[a.which]=!1;var c=String.fromCharCode(a.which);if(c||(c=a.which),this._setProperty("key",c),this._setProperty("keyCode",a.which),"function"==typeof b){var d=b(a);d===!1&&a.preventDefault()}},d.prototype._onkeypress=function(a){this._setProperty("keyCode",a.which),this._setProperty("key",String.fromCharCode(a.which));var b=this.keyTyped||window.keyTyped;if("function"==typeof b){var c=b(a);c===!1&&a.preventDefault()}},d.prototype._onblur=function(a){e={}},d.prototype.keyIsDown=function(a){return e[a]},b.exports=d},{"../core/core":50}],65:[function(a,b,c){"use strict";function d(a,b){var c=a.getBoundingClientRect();return{x:b.clientX-c.left,y:b.clientY-c.top}}var e=a("../core/core"),f=a("../core/constants");e.prototype._nextMouseX=0,e.prototype._nextMouseY=0,e.prototype.mouseX=0,e.prototype.mouseY=0,e.prototype.pmouseX=0,e.prototype.pmouseY=0,e.prototype.winMouseX=0,e.prototype.winMouseY=0,e.prototype.pwinMouseX=0,e.prototype.pwinMouseY=0,e.prototype.mouseButton=0,e.prototype.mouseIsPressed=!1,e.prototype.isMousePressed=!1,e.prototype._updateNextMouseCoords=function(a){if("touchstart"===a.type||"touchmove"===a.type||"touchend"===a.type)this._setProperty("_nextMouseX",this._nextTouchX),this._setProperty("_nextMouseY",this._nextTouchY);else if(null!==this._curElement){var b=d(this._curElement.elt,a);this._setProperty("_nextMouseX",b.x),this._setProperty("_nextMouseY",b.y)}this._setProperty("winMouseX",a.pageX),this._setProperty("winMouseY",a.pageY)},e.prototype._updateMouseCoords=function(){this._setProperty("pmouseX",this.mouseX),this._setProperty("pmouseY",this.mouseY),this._setProperty("mouseX",this._nextMouseX),this._setProperty("mouseY",this._nextMouseY),this._setProperty("pwinMouseX",this.winMouseX),this._setProperty("pwinMouseY",this.winMouseY)},e.prototype._setMouseButton=function(a){1===a.button?this._setProperty("mouseButton",f.CENTER):2===a.button?this._setProperty("mouseButton",f.RIGHT):this._setProperty("mouseButton",f.LEFT)},e.prototype._onmousemove=function(a){var b,c=this._isGlobal?window:this;this._updateNextMouseCoords(a),this._updateNextTouchCoords(a),this.isMousePressed?"function"==typeof c.mouseDragged?(b=c.mouseDragged(a),b===!1&&a.preventDefault()):"function"==typeof c.touchMoved&&(b=c.touchMoved(a),b===!1&&a.preventDefault()):"function"==typeof c.mouseMoved&&(b=c.mouseMoved(a),b===!1&&a.preventDefault())},e.prototype._onmousedown=function(a){var b,c=this._isGlobal?window:this;this._setProperty("isMousePressed",!0),this._setProperty("mouseIsPressed",!0),this._setMouseButton(a),this._updateNextMouseCoords(a),this._updateNextTouchCoords(a),"function"==typeof c.mousePressed?(b=c.mousePressed(a),b===!1&&a.preventDefault()):"function"==typeof c.touchStarted&&(b=c.touchStarted(a),b===!1&&a.preventDefault())},e.prototype._onmouseup=function(a){var b,c=this._isGlobal?window:this;this._setProperty("isMousePressed",!1),this._setProperty("mouseIsPressed",!1),"function"==typeof c.mouseReleased?(b=c.mouseReleased(a),b===!1&&a.preventDefault()):"function"==typeof c.touchEnded&&(b=c.touchEnded(a),b===!1&&a.preventDefault())},e.prototype._ondragend=e.prototype._onmouseup,e.prototype._ondragover=e.prototype._onmousemove,e.prototype._onclick=function(a){var b=this._isGlobal?window:this;if("function"==typeof b.mouseClicked){var c=b.mouseClicked(a);c===!1&&a.preventDefault()}},e.prototype._onwheel=function(a){var b=this._isGlobal?window:this;if("function"==typeof b.mouseWheel){a.delta=a.deltaY;var c=b.mouseWheel(a);c===!1&&a.preventDefault()}},b.exports=e},{"../core/constants":49,"../core/core":50}],66:[function(a,b,c){"use strict";function d(a,b,c){c=c||0;var d=a.getBoundingClientRect(),e=b.touches[c]||b.changedTouches[c];return{x:e.clientX-d.left,y:e.clientY-d.top,id:e.identifier}}var e=a("../core/core");e.prototype._nextTouchX=0,e.prototype._nextTouchY=0,e.prototype.touchX=0,e.prototype.touchY=0,e.prototype.ptouchX=0,e.prototype.ptouchY=0,e.prototype.touches=[],e.prototype.touchIsDown=!1,e.prototype._updateNextTouchCoords=function(a){if("mousedown"===a.type||"mousemove"===a.type||"mouseup"===a.type)this._setProperty("_nextTouchX",this._nextMouseX),this._setProperty("_nextTouchY",this._nextMouseY);else if(null!==this._curElement){var b=d(this._curElement.elt,a,0);this._setProperty("_nextTouchX",b.x),this._setProperty("_nextTouchY",b.y);for(var c=[],e=0;e<a.touches.length;e++)c[e]=d(this._curElement.elt,a,e);this._setProperty("touches",c)}},e.prototype._updateTouchCoords=function(){this._setProperty("ptouchX",this.touchX),this._setProperty("ptouchY",this.touchY),this._setProperty("touchX",this._nextTouchX),this._setProperty("touchY",this._nextTouchY)},e.prototype._ontouchstart=function(a){var b,c=this._isGlobal?window:this;this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),this._setProperty("touchIsDown",!0),"function"==typeof c.touchStarted?(b=c.touchStarted(a),b===!1&&a.preventDefault()):"function"==typeof c.mousePressed&&(b=c.mousePressed(a),b===!1&&a.preventDefault())},e.prototype._ontouchmove=function(a){var b,c=this._isGlobal?window:this;this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),"function"==typeof c.touchMoved?(b=c.touchMoved(a),b===!1&&a.preventDefault()):"function"==typeof c.mouseDragged&&(b=c.mouseDragged(a),b===!1&&a.preventDefault())},e.prototype._ontouchend=function(a){this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),0===this.touches.length&&this._setProperty("touchIsDown",!1);var b,c=this._isGlobal?window:this;"function"==typeof c.touchEnded?(b=c.touchEnded(a),b===!1&&a.preventDefault()):"function"==typeof c.mouseReleased&&(b=c.mouseReleased(a),b===!1&&a.preventDefault())},b.exports=e},{"../core/core":50}],67:[function(a,b,c){"use strict";function d(a){var b=3.5*a|0;if(b=1>b?1:248>b?b:248,g!==b){g=b,h=1+g<<1,i=new Int32Array(h),j=new Array(h);for(var c=0;h>c;c++)j[c]=new Int32Array(256);for(var d,e,f,k,l=1,m=b-1;b>l;l++){i[b+l]=i[m]=e=m*m,f=j[b+l],k=j[m--];for(var n=0;256>n;n++)f[n]=k[n]=e*n}d=i[b]=b*b,f=j[b];for(var o=0;256>o;o++)f[o]=d*o}}function e(a,b){for(var c=f._toPixels(a),e=a.width,k=a.height,l=e*k,m=new Int32Array(l),n=0;l>n;n++)m[n]=f._getARGB(c,n);var o,p,q,r,s,t,u,v,w,x,y=new Int32Array(l),z=new Int32Array(l),A=new Int32Array(l),B=new Int32Array(l),C=0;d(b);var D,E,F,G;for(E=0;k>E;E++){for(D=0;e>D;D++){if(r=q=p=s=o=0,t=D-g,0>t)x=-t,t=0;else{if(t>=e)break;x=0}for(F=x;h>F&&!(t>=e);F++){var H=m[t+C];G=j[F],s+=G[(-16777216&H)>>>24],p+=G[(16711680&H)>>16],q+=G[(65280&H)>>8],r+=G[255&H],o+=i[F],t++}u=C+D,y[u]=s/o,z[u]=p/o,A[u]=q/o,B[u]=r/o}C+=e}for(C=0,v=-g,w=v*e,E=0;k>E;E++){for(D=0;e>D;D++){if(r=q=p=s=o=0,0>v)x=u=-v,t=D;else{if(v>=k)break;x=0,u=v,t=D+w}for(F=x;h>F&&!(u>=k);F++)G=j[F],s+=G[y[t]],p+=G[z[t]],q+=G[A[t]],r+=G[B[t]],o+=i[F],u++,t+=e;m[D+C]=s/o<<24|p/o<<16|q/o<<8|r/o}C+=e,w+=e,v++}f._setPixels(c,m)}var f={};f._toPixels=function(a){return a instanceof ImageData?a.data:a.getContext("2d").getImageData(0,0,a.width,a.height).data},f._getARGB=function(a,b){var c=4*b;return a[c+3]<<24&4278190080|a[c]<<16&16711680|a[c+1]<<8&65280|255&a[c+2]},f._setPixels=function(a,b){for(var c=0,d=0,e=a.length;e>d;d++)c=4*d,a[c+0]=(16711680&b[d])>>>16,a[c+1]=(65280&b[d])>>>8,a[c+2]=255&b[d],a[c+3]=(4278190080&b[d])>>>24},f._toImageData=function(a){return a instanceof ImageData?a:a.getContext("2d").getImageData(0,0,a.width,a.height)},f._createImageData=function(a,b){return f._tmpCanvas=document.createElement("canvas"),f._tmpCtx=f._tmpCanvas.getContext("2d"),this._tmpCtx.createImageData(a,b)},f.apply=function(a,b,c){var d=a.getContext("2d"),e=d.getImageData(0,0,a.width,a.height),f=b(e,c);f instanceof ImageData?d.putImageData(f,0,0,0,0,a.width,a.height):d.putImageData(e,0,0,0,0,a.width,a.height)},f.threshold=function(a,b){var c=f._toPixels(a);void 0===b&&(b=.5);for(var d=Math.floor(255*b),e=0;e<c.length;e+=4){var g,h=c[e],i=c[e+1],j=c[e+2],k=.2126*h+.7152*i+.0722*j;g=k>=d?255:0,c[e]=c[e+1]=c[e+2]=g}},f.gray=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4){var d=b[c],e=b[c+1],g=b[c+2],h=.2126*d+.7152*e+.0722*g;b[c]=b[c+1]=b[c+2]=h}},f.opaque=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4)b[c+3]=255;return b},f.invert=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4)b[c]=255-b[c],b[c+1]=255-b[c+1],b[c+2]=255-b[c+2]},f.posterize=function(a,b){var c=f._toPixels(a);if(2>b||b>255)throw new Error("Level must be greater than 2 and less than 255 for posterize");for(var d=b-1,e=0;e<c.length;e+=4){var g=c[e],h=c[e+1],i=c[e+2];c[e]=255*(g*b>>8)/d,c[e+1]=255*(h*b>>8)/d,c[e+2]=255*(i*b>>8)/d}},f.dilate=function(a){for(var b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t=f._toPixels(a),u=0,v=t.length?t.length/4:0,w=new Int32Array(v);v>u;)for(b=u,c=u+a.width;c>u;)d=e=f._getARGB(t,u),i=u-1,h=u+1,j=u-a.width,k=u+a.width,b>i&&(i=u),h>=c&&(h=u),0>j&&(j=0),k>=v&&(k=u),n=f._getARGB(t,j),m=f._getARGB(t,i),o=f._getARGB(t,k),l=f._getARGB(t,h),g=77*(d>>16&255)+151*(d>>8&255)+28*(255&d),q=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),p=77*(l>>16&255)+151*(l>>8&255)+28*(255&l),r=77*(n>>16&255)+151*(n>>8&255)+28*(255&n),s=77*(o>>16&255)+151*(o>>8&255)+28*(255&o),q>g&&(e=m,g=q),p>g&&(e=l,g=p),r>g&&(e=n,g=r),s>g&&(e=o,g=s),w[u++]=e;f._setPixels(t,w)},f.erode=function(a){for(var b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t=f._toPixels(a),u=0,v=t.length?t.length/4:0,w=new Int32Array(v);v>u;)for(b=u,c=u+a.width;c>u;)d=e=f._getARGB(t,u),i=u-1,h=u+1,j=u-a.width,k=u+a.width,b>i&&(i=u),h>=c&&(h=u),0>j&&(j=0),k>=v&&(k=u),n=f._getARGB(t,j),m=f._getARGB(t,i),o=f._getARGB(t,k),l=f._getARGB(t,h),g=77*(d>>16&255)+151*(d>>8&255)+28*(255&d),q=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),p=77*(l>>16&255)+151*(l>>8&255)+28*(255&l),r=77*(n>>16&255)+151*(n>>8&255)+28*(255&n),s=77*(o>>16&255)+151*(o>>8&255)+28*(255&o),g>q&&(e=m,g=q),g>p&&(e=l,g=p),g>r&&(e=n,g=r),g>s&&(e=o,g=s),w[u++]=e;f._setPixels(t,w)};var g,h,i,j;f.blur=function(a,b){e(a,b)},b.exports=f},{}],68:[function(a,b,c){"use strict";var d=a("../core/core"),e=[];d.prototype.createImage=function(a,b){return new d.Image(a,b)},d.prototype.saveCanvas=function(){var a,b,c;if(3===arguments.length?(a=arguments[0],b=arguments[1],c=arguments[2]):2===arguments.length?"object"==typeof arguments[0]?(a=arguments[0],b=arguments[1]):(b=arguments[0],c=arguments[1]):1===arguments.length&&("object"==typeof arguments[0]?a=arguments[0]:b=arguments[0]),a instanceof d.Element&&(a=a.elt),a instanceof HTMLCanvasElement||(a=null),c||(c=d.prototype._checkFileExtension(b,c)[1],""===c&&(c="png")),a||this._curElement&&this._curElement.elt&&(a=this._curElement.elt),d.prototype._isSafari()){var e="Hello, Safari user!\n";e+="Now capturing a screenshot...\n",e+="To save this image,\n",e+="go to File --> Save As.\n",alert(e),window.location.href=a.toDataURL()}else{var f;if("undefined"==typeof c)c="png",f="image/png";else switch(c){case"png":f="image/png";break;case"jpeg":f="image/jpeg";break;case"jpg":f="image/jpeg";break;default:f="image/png"}var g="image/octet-stream",h=a.toDataURL(f);h=h.replace(f,g),d.prototype.downloadFile(h,b,c)}},d.prototype.saveFrames=function(a,b,c,f,g){var h=c||3;h=d.prototype.constrain(h,0,15),h=1e3*h;var i=f||15;i=d.prototype.constrain(i,0,22);var j=0,k=d.prototype._makeFrame,l=this._curElement.elt,m=setInterval(function(){k(a+j,b,l),j++},1e3/i);setTimeout(function(){if(clearInterval(m),g)g(e);else for(var a=0;a<e.length;a++){var b=e[a];d.prototype.downloadFile(b.imageData,b.filename,b.ext)}e=[]},h+.01)},d.prototype._makeFrame=function(a,b,c){var d;d=this?this._curElement.elt:c;var f;if(b)switch(b.toLowerCase()){case"png":f="image/png";break;case"jpeg":f="image/jpeg";break;case"jpg":f="image/jpeg";break;default:f="image/png"}else b="png",f="image/png";var g="image/octet-stream",h=d.toDataURL(f);h=h.replace(f,g);var i={};i.imageData=h,i.filename=a,i.ext=b,e.push(i)},b.exports=d},{"../core/core":50}],69:[function(a,b,c){"use strict";function d(a,b){return a>0&&b>a?a:b}var e=a("../core/core"),f=a("./filters"),g=a("../core/canvas"),h=a("../core/constants");a("../core/error_helpers"),e.prototype.loadImage=function(a,b,c){var d=new Image,f=new e.Image(1,1,this),g=e._getDecrementPreload.apply(this,arguments);return d.onload=function(){f.width=f.canvas.width=d.width,f.height=f.canvas.height=d.height,f.drawingContext.drawImage(d,0,0),"function"==typeof b&&b(f),g&&b!==g&&g()},d.onerror=function(a){e._friendlyFileLoadError(0,d.src),"function"==typeof c&&c!==g&&c(a)},0!==a.indexOf("data:image/")&&(d.crossOrigin="Anonymous"),d.src=a,f},e.prototype.image=function(a,b,c,e,f,h,i,j,k){if(arguments.length<=5)if(h=b||0,i=c||0,b=0,c=0,a.elt&&a.elt.videoWidth&&!a.canvas){var l=a.elt.videoWidth,m=a.elt.videoHeight;j=e||a.width,k=f||a.width*m/l,e=l,f=m}else j=e||a.width,k=f||a.height,e=a.width,f=a.height;else{if(9!==arguments.length)throw"Wrong number of arguments to image()";b=b||0,c=c||0,e=d(e,a.width),f=d(f,a.height),h=h||0,i=i||0,j=j||a.width,k=k||a.height}var n=g.modeAdjust(h,i,j,k,this._renderer._imageMode);this._renderer.image(a,b,c,e,f,n.x,n.y,n.w,n.h)},e.prototype.tint=function(){var a=this.color.apply(this,arguments);this._renderer._tint=a.levels},e.prototype.noTint=function(){this._renderer._tint=null},e.prototype._getTintedImageCanvas=function(a){if(!a.canvas)return a;var b=f._toPixels(a.canvas),c=document.createElement("canvas");c.width=a.canvas.width,c.height=a.canvas.height;for(var d=c.getContext("2d"),e=d.createImageData(a.canvas.width,a.canvas.height),g=e.data,h=0;h<b.length;h+=4){var i=b[h],j=b[h+1],k=b[h+2],l=b[h+3];g[h]=i*this._renderer._tint[0]/255,g[h+1]=j*this._renderer._tint[1]/255,g[h+2]=k*this._renderer._tint[2]/255,g[h+3]=l*this._renderer._tint[3]/255}return d.putImageData(e,0,0),c},e.prototype.imageMode=function(a){(a===h.CORNER||a===h.CORNERS||a===h.CENTER)&&(this._renderer._imageMode=a)},b.exports=e},{"../core/canvas":48,"../core/constants":49,"../core/core":50,"../core/error_helpers":53,"./filters":67}],70:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./filters");d.Image=function(a,b){this.width=a,this.height=b,this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.drawingContext=this.canvas.getContext("2d"),this._pixelDensity=1,this.isTexture=!1,this.pixels=[]},d.Image.prototype._setProperty=function(a,b){this[a]=b},d.Image.prototype.loadPixels=function(){d.Renderer2D.prototype.loadPixels.call(this)},d.Image.prototype.updatePixels=function(a,b,c,e){d.Renderer2D.prototype.updatePixels.call(this,a,b,c,e)},d.Image.prototype.get=function(a,b,c,e){return d.Renderer2D.prototype.get.call(this,a,b,c,e)},d.Image.prototype.set=function(a,b,c){d.Renderer2D.prototype.set.call(this,a,b,c)},d.Image.prototype.resize=function(a,b){0===a&&0===b?(a=this.canvas.width,b=this.canvas.height):0===a?a=this.canvas.width*b/this.canvas.height:0===b&&(b=this.canvas.height*a/this.canvas.width);var c=document.createElement("canvas");c.width=a,c.height=b,c.getContext("2d").drawImage(this.canvas,0,0,this.canvas.width,this.canvas.height,0,0,c.width,c.height),this.canvas.width=this.width=a,this.canvas.height=this.height=b,this.drawingContext.drawImage(c,0,0,a,b,0,0,a,b),this.pixels.length>0&&this.loadPixels()},d.Image.prototype.copy=function(){d.prototype.copy.apply(this,arguments)},d.Image.prototype.mask=function(a){void 0===a&&(a=this);var b=this.drawingContext.globalCompositeOperation,c=1;a instanceof d.Renderer&&(c=a._pInst._pixelDensity);var e=[a,0,0,c*a.width,c*a.height,0,0,this.width,this.height];this.drawingContext.globalCompositeOperation="destination-in",this.copy.apply(this,e),this.drawingContext.globalCompositeOperation=b},d.Image.prototype.filter=function(a,b){e.apply(this.canvas,e[a.toLowerCase()],b)},d.Image.prototype.blend=function(){d.prototype.blend.apply(this,arguments)},d.Image.prototype.save=function(a,b){var c;if(b)switch(b.toLowerCase()){case"png":c="image/png";break;case"jpeg":c="image/jpeg";break;case"jpg":c="image/jpeg";break;default:c="image/png"}else b="png",c="image/png";var e="image/octet-stream",f=this.canvas.toDataURL(c);f=f.replace(c,e),d.prototype.downloadFile(f,a,b)},d.Image.prototype.createTexture=function(a){return this},b.exports=d.Image},{"../core/core":50,"./filters":67}],71:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./filters");a("../color/p5.Color"),d.prototype.pixels=[],d.prototype.blend=function(){this._renderer.blend.apply(this._renderer,arguments)},d.prototype.copy=function(){d.Renderer2D._copyHelper.apply(this,arguments)},d.prototype.filter=function(a,b){e.apply(this.canvas,e[a.toLowerCase()],b)},d.prototype.get=function(a,b,c,d){return this._renderer.get(a,b,c,d)},d.prototype.loadPixels=function(){this._renderer.loadPixels()},d.prototype.set=function(a,b,c){this._renderer.set(a,b,c)},d.prototype.updatePixels=function(a,b,c,d){0!==this.pixels.length&&this._renderer.updatePixels(a,b,c,d)},b.exports=d},{"../color/p5.Color":44,"../core/core":50,"./filters":67}],72:[function(a,b,c){"use strict";function d(a,b){var c={};if(b=b||[],"undefined"==typeof b)for(var d=0;d<a.length;d++)b[d.toString()]=d;for(var e=0;e<b.length;e++){
var f=b[e],g=a[e];c[f]=g}return c}function e(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function f(a,b){b&&b!==!0&&"true"!==b||(b=""),a||(a="untitled");var c="";return a&&a.indexOf(".")>-1&&(c=a.split(".").pop()),b&&c!==b&&(c=b,a=a+"."+c),[a,c]}function g(a){document.body.removeChild(a.target)}var h=a("../core/core"),i=a("reqwest"),j=a("opentype.js");a("../core/error_helpers"),h._getDecrementPreload=function(){var a=arguments[arguments.length-1];return(window.preload||this&&this.preload)&&"function"==typeof a?a:null},h.prototype.loadFont=function(a,b,c){var d=new h.Font(this),e=h._getDecrementPreload.apply(this,arguments);return j.load(a,function(f,g){if(f){if("undefined"!=typeof c&&c!==e)return c(f);throw f}d.font=g,"undefined"!=typeof b&&b(d),e&&b!==e&&e();var h,i,j=["ttf","otf","woff","woff2"],k=a.split("\\").pop().split("/").pop(),l=k.lastIndexOf("."),m=1>l?null:k.substr(l+1);j.indexOf(m)>-1&&(h=k.substr(0,l),i=document.createElement("style"),i.appendChild(document.createTextNode("\n@font-face {\nfont-family: "+h+";\nsrc: url("+a+");\n}\n")),document.head.appendChild(i))}),d},h.prototype.createInput=function(){throw"not yet implemented"},h.prototype.createReader=function(){throw"not yet implemented"},h.prototype.loadBytes=function(){throw"not yet implemented"},h.prototype.loadJSON=function(){for(var a,b=arguments[0],c=arguments[1],d=h._getDecrementPreload.apply(this,arguments),e=[],f="json",g=2;g<arguments.length;g++){var j=arguments[g];"string"==typeof j?("jsonp"===j||"json"===j)&&(f=j):"function"==typeof j&&(a=j)}return i({url:b,type:f,crossOrigin:!0,error:function(b){a?a(b):console.log(b.statusText)},success:function(a){for(var b in a)e[b]=a[b];"undefined"!=typeof c&&c(a),d&&c!==d&&d()}}),e},h.prototype.loadStrings=function(a,b,c){var d=[],e=new XMLHttpRequest,f=h._getDecrementPreload.apply(this,arguments);return e.addEventListener("error",function(a){c?c(a):console.log(a.responseText)}),e.open("GET",a,!0),e.onreadystatechange=function(){if(4===e.readyState)if(200===e.status){var a=e.responseText.match(/[^\r\n]+/g);for(var g in a)d[g]=a[g];"undefined"!=typeof b&&b(d),f&&b!==f&&f()}else c?c(e):console.log(e.statusText)},e.send(null),d},h.prototype.loadTable=function(a){for(var b=null,c=[],e=!1,f=",",g=!1,j=h._getDecrementPreload.apply(this,arguments),k=1;k<arguments.length;k++)if("function"==typeof arguments[k]&&arguments[k]!==j)b=arguments[k];else if("string"==typeof arguments[k])if(c.push(arguments[k]),"header"===arguments[k]&&(e=!0),"csv"===arguments[k]){if(g)throw new Error("Cannot set multiple separator types.");f=",",g=!0}else if("tsv"===arguments[k]){if(g)throw new Error("Cannot set multiple separator types.");f="	",g=!0}var l=new h.Table;return i({url:a,crossOrigin:!0,type:"csv"}).then(function(a){a=a.responseText;for(var c,g={},i=0,m=1,n=2,o=4,p='"',q="\r",r="\n",s=[],t=0,u=null,v=function(){g.escaped=!1,u=[],x()},w=function(){g.currentState=o,s.push(u),u=null},x=function(){g.currentState=i,g.token=""},y=function(){u.push(g.token),x()};;){if(c=a[t++],null==c){if(g.escaped)throw new Error("Unclosed quote in file.");if(u){y(),w();break}}if(null===u&&v(),g.currentState===i){if(c===p){g.escaped=!0,g.currentState=m;continue}g.currentState=m}g.currentState===m&&g.escaped?c===p?a[t]===p?(g.token+=p,t++):(g.escaped=!1,g.currentState=n):g.token+=c:c===q?(a[t]===r&&t++,y(),w()):c===r?(y(),w()):c===f?y():g.currentState===m&&(g.token+=c)}if(e)l.columns=s.shift();else for(k=0;k<s.length;k++)l.columns[k]=k.toString();var z;for(k=0;k<s.length&&(k!==s.length-1||1!==s[k].length||"undefined"!==s[k][0]);k++)z=new h.TableRow,z.arr=s[k],z.obj=d(s[k],l.columns),l.addRow(z);null!==b&&b(l),j&&b!==j&&j()}).fail(function(c,d){h._friendlyFileLoadError(2,a),"undefined"!=typeof b&&b!==j&&b(!1)}),l},h.prototype.loadXML=function(a,b,c){var d=document.implementation.createDocument(null,null),e=h._getDecrementPreload.apply(this,arguments);return i({url:a,type:"xml",crossOrigin:!0,error:function(a){c?c(a):console.log(a.statusText)}}).then(function(a){var c=a.documentElement;d.appendChild(c),"undefined"!=typeof b&&b(d),e&&b!==e&&e()}),d},h.prototype.parseXML=function(){throw"not yet implemented"},h.prototype.selectFolder=function(){throw"not yet implemented"},h.prototype.selectInput=function(){throw"not yet implemented"},h.prototype.httpGet=function(){var a=Array.prototype.slice.call(arguments);a.push("GET"),h.prototype.httpDo.apply(this,a)},h.prototype.httpPost=function(){var a=Array.prototype.slice.call(arguments);a.push("POST"),h.prototype.httpDo.apply(this,a)},h.prototype.httpDo=function(){if("object"==typeof arguments[0])i(arguments[0]);else{for(var a,b,c="GET",d=arguments[0],e={},f="",g=1;g<arguments.length;g++){var h=arguments[g];"string"==typeof h?"GET"===h||"POST"===h||"PUT"===h?c=h:f=h:"object"==typeof h?e=h:"function"==typeof h&&(a?b=h:a=h)}""===f&&(f=-1!==d.indexOf("json")?"json":-1!==d.indexOf("xml")?"xml":"text"),i({url:d,method:c,data:e,type:f,crossOrigin:!0,success:function(b){"undefined"!=typeof a&&a("text"===f?b.response:b)},error:function(a){b?b(a):console.log(a.statusText)}})}},window.URL=window.URL||window.webkitURL,h.prototype._pWriters=[],h.prototype.beginRaw=function(){throw"not yet implemented"},h.prototype.beginRecord=function(){throw"not yet implemented"},h.prototype.createOutput=function(){throw"not yet implemented"},h.prototype.createWriter=function(a,b){var c;for(var d in h.prototype._pWriters)if(h.prototype._pWriters[d].name===a)return c=new h.PrintWriter(a+window.millis(),b),h.prototype._pWriters.push(c),c;return c=new h.PrintWriter(a,b),h.prototype._pWriters.push(c),c},h.prototype.endRaw=function(){throw"not yet implemented"},h.prototype.endRecord=function(){throw"not yet implemented"},h.PrintWriter=function(a,b){var c=this;this.name=a,this.content="",this.print=function(a){this.content+=a},this.println=function(a){this.content+=a+"\n"},this.flush=function(){this.content=""},this.close=function(){var d=[];d.push(this.content),h.prototype.writeFile(d,a,b);for(var e in h.prototype._pWriters)h.prototype._pWriters[e].name===this.name&&h.prototype._pWriters.splice(e,1);c.flush(),c={}}},h.prototype.saveBytes=function(){throw"not yet implemented"},h.prototype.save=function(a,b,c){var d=arguments,e=this._curElement.elt;if(0===d.length)return void h.prototype.saveCanvas(e);if(d[0]instanceof h.Renderer||d[0]instanceof h.Graphics)return void h.prototype.saveCanvas(d[0].elt,d[1],d[2]);if(1===d.length&&"string"==typeof d[0])h.prototype.saveCanvas(e,d[0]);else{var g=f(d[1],d[2])[1];switch(g){case"json":return void h.prototype.saveJSON(d[0],d[1],d[2]);case"txt":return void h.prototype.saveStrings(d[0],d[1],d[2]);default:d[0]instanceof Array?h.prototype.saveStrings(d[0],d[1],d[2]):d[0]instanceof h.Table?h.prototype.saveTable(d[0],d[1],d[2],d[3]):d[0]instanceof h.Image?h.prototype.saveCanvas(d[0].canvas,d[1]):d[0]instanceof h.SoundFile&&h.prototype.saveSound(d[0],d[1],d[2],d[3])}}},h.prototype.saveJSON=function(a,b,c){var d;d=c?JSON.stringify(a):JSON.stringify(a,void 0,2),console.log(d),this.saveStrings(d.split("\n"),b,"json")},h.prototype.saveJSONObject=h.prototype.saveJSON,h.prototype.saveJSONArray=h.prototype.saveJSON,h.prototype.saveStream=function(){throw"not yet implemented"},h.prototype.saveStrings=function(a,b,c){for(var d=c||"txt",e=this.createWriter(b,d),f=0;f<a.length;f++)f<a.length-1?e.println(a[f]):e.print(a[f]);e.close(),e.flush()},h.prototype.saveXML=function(){throw"not yet implemented"},h.prototype.selectOutput=function(){throw"not yet implemented"},h.prototype.saveTable=function(a,b,c){var d=this.createWriter(b,c),f=a.columns,g=",";if("tsv"===c&&(g="	"),"html"!==c){if("0"!==f[0])for(var h=0;h<f.length;h++)h<f.length-1?d.print(f[h]+g):d.println(f[h]);for(var i=0;i<a.rows.length;i++){var j;for(j=0;j<a.rows[i].arr.length;j++)j<a.rows[i].arr.length-1?d.print(a.rows[i].arr[j]+g):i<a.rows.length-1?d.println(a.rows[i].arr[j]):d.print(a.rows[i].arr[j])}}else{d.println("<html>"),d.println("<head>");var k='  <meta http-equiv="content-type" content';if(k+='="text/html;charset=utf-8" />',d.println(k),d.println("</head>"),d.println("<body>"),d.println("  <table>"),"0"!==f[0]){d.println("    <tr>");for(var l=0;l<f.length;l++){var m=e(f[l]);d.println("      <td>"+m),d.println("      </td>")}d.println("    </tr>")}for(var n=0;n<a.rows.length;n++){d.println("    <tr>");for(var o=0;o<a.columns.length;o++){var p=a.rows[n].getString(o),q=e(p);d.println("      <td>"+q),d.println("      </td>")}d.println("    </tr>")}d.println("  </table>"),d.println("</body>"),d.print("</html>")}d.close(),d.flush()},h.prototype.writeFile=function(a,b,c){var d="application/octet-stream";h.prototype._isSafari()&&(d="text/plain");var e=new Blob(a,{type:d}),f=window.URL.createObjectURL(e);h.prototype.downloadFile(f,b,c)},h.prototype.downloadFile=function(a,b,c){var d=f(b,c),e=d[0],i=d[1],j=document.createElement("a");if(j.href=a,j.download=e,j.onclick=g,j.style.display="none",document.body.appendChild(j),h.prototype._isSafari()){var k="Hello, Safari user! To download this file...\n";k+="1. Go to File --> Save As.\n",k+='2. Choose "Page Source" as the Format.\n',k+='3. Name it with this extension: ."'+i+'"',alert(k)}j.click(),a=null},h.prototype._checkFileExtension=f,h.prototype._isSafari=function(){var a=Object.prototype.toString.call(window.HTMLElement);return a.indexOf("Constructor")>0},b.exports=h},{"../core/core":50,"../core/error_helpers":53,"opentype.js":8,reqwest:29}],73:[function(a,b,c){"use strict";var d=a("../core/core");d.Table=function(a){this.columns=[],this.rows=[]},d.Table.prototype.addRow=function(a){var b=a||new d.TableRow;if("undefined"==typeof b.arr||"undefined"==typeof b.obj)throw"invalid TableRow: "+b;return b.table=this,this.rows.push(b),b},d.Table.prototype.removeRow=function(a){this.rows[a].table=null;var b=this.rows.splice(a+1,this.rows.length);this.rows.pop(),this.rows=this.rows.concat(b)},d.Table.prototype.getRow=function(a){return this.rows[a]},d.Table.prototype.getRows=function(){return this.rows},d.Table.prototype.findRow=function(a,b){if("string"==typeof b){for(var c=0;c<this.rows.length;c++)if(this.rows[c].obj[b]===a)return this.rows[c]}else for(var d=0;d<this.rows.length;d++)if(this.rows[d].arr[b]===a)return this.rows[d];return null},d.Table.prototype.findRows=function(a,b){var c=[];if("string"==typeof b)for(var d=0;d<this.rows.length;d++)this.rows[d].obj[b]===a&&c.push(this.rows[d]);else for(var e=0;e<this.rows.length;e++)this.rows[e].arr[b]===a&&c.push(this.rows[e]);return c},d.Table.prototype.matchRow=function(a,b){if("number"==typeof b){for(var c=0;c<this.rows.length;c++)if(this.rows[c].arr[b].match(a))return this.rows[c]}else for(var d=0;d<this.rows.length;d++)if(this.rows[d].obj[b].match(a))return this.rows[d];return null},d.Table.prototype.matchRows=function(a,b){var c=[];if("number"==typeof b)for(var d=0;d<this.rows.length;d++)this.rows[d].arr[b].match(a)&&c.push(this.rows[d]);else for(var e=0;e<this.rows.length;e++)this.rows[e].obj[b].match(a)&&c.push(this.rows[e]);return c},d.Table.prototype.getColumn=function(a){var b=[];if("string"==typeof a)for(var c=0;c<this.rows.length;c++)b.push(this.rows[c].obj[a]);else for(var d=0;d<this.rows.length;d++)b.push(this.rows[d].arr[a]);return b},d.Table.prototype.clearRows=function(){delete this.rows,this.rows=[]},d.Table.prototype.addColumn=function(a){var b=a||null;this.columns.push(b)},d.Table.prototype.getColumnCount=function(){return this.columns.length},d.Table.prototype.getRowCount=function(){return this.rows.length},d.Table.prototype.removeTokens=function(a,b){for(var c=function(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},d=[],e=0;e<a.length;e++)d.push(c(a.charAt(e)));var f=new RegExp(d.join("|"),"g");if("undefined"==typeof b)for(var g=0;g<this.columns.length;g++)for(var h=0;h<this.rows.length;h++){var i=this.rows[h].arr[g];i=i.replace(f,""),this.rows[h].arr[g]=i,this.rows[h].obj[this.columns[g]]=i}else if("string"==typeof b)for(var j=0;j<this.rows.length;j++){var k=this.rows[j].obj[b];k=k.replace(f,""),this.rows[j].obj[b]=k;var l=this.columns.indexOf(b);this.rows[j].arr[l]=k}else for(var m=0;m<this.rows.length;m++){var n=this.rows[m].arr[b];n=n.replace(f,""),this.rows[m].arr[b]=n,this.rows[m].obj[this.columns[b]]=n}},d.Table.prototype.trim=function(a){var b=new RegExp(" ","g");if("undefined"==typeof a)for(var c=0;c<this.columns.length;c++)for(var d=0;d<this.rows.length;d++){var e=this.rows[d].arr[c];e=e.replace(b,""),this.rows[d].arr[c]=e,this.rows[d].obj[this.columns[c]]=e}else if("string"==typeof a)for(var f=0;f<this.rows.length;f++){var g=this.rows[f].obj[a];g=g.replace(b,""),this.rows[f].obj[a]=g;var h=this.columns.indexOf(a);this.rows[f].arr[h]=g}else for(var i=0;i<this.rows.length;i++){var j=this.rows[i].arr[a];j=j.replace(b,""),this.rows[i].arr[a]=j,this.rows[i].obj[this.columns[a]]=j}},d.Table.prototype.removeColumn=function(a){var b,c;"string"==typeof a?(b=a,c=this.columns.indexOf(a),console.log("string")):(c=a,b=this.columns[a]);var d=this.columns.splice(c+1,this.columns.length);this.columns.pop(),this.columns=this.columns.concat(d);for(var e=0;e<this.rows.length;e++){var f=this.rows[e].arr,g=f.splice(c+1,f.length);f.pop(),this.rows[e].arr=f.concat(g),delete this.rows[e].obj[b]}},d.Table.prototype.set=function(a,b,c){this.rows[a].set(b,c)},d.Table.prototype.setNum=function(a,b,c){this.rows[a].setNum(b,c)},d.Table.prototype.setString=function(a,b,c){this.rows[a].setString(b,c)},d.Table.prototype.get=function(a,b){return this.rows[a].get(b)},d.Table.prototype.getNum=function(a,b){return this.rows[a].getNum(b)},d.Table.prototype.getString=function(a,b){return this.rows[a].getString(b)},d.Table.prototype.getObject=function(a){for(var b,c,d,e={},f=0;f<this.rows.length;f++)if(b=this.rows[f].obj,"string"==typeof a){if(c=this.columns.indexOf(a),!(c>=0))throw'This table has no column named "'+a+'"';d=b[a],e[d]=b}else e[f]=this.rows[f].obj;return e},d.Table.prototype.getArray=function(){for(var a=[],b=0;b<this.rows.length;b++)a.push(this.rows[b].arr);return a},b.exports=d.Table},{"../core/core":50}],74:[function(a,b,c){"use strict";var d=a("../core/core");d.TableRow=function(a,b){var c=[],d={};a&&(b=b||",",c=a.split(b));for(var e=0;e<c.length;e++){var f=e,g=c[e];d[f]=g}this.arr=c,this.obj=d,this.table=null},d.TableRow.prototype.set=function(a,b){if("string"==typeof a){var c=this.table.columns.indexOf(a);if(!(c>=0))throw'This table has no column named "'+a+'"';this.obj[a]=b,this.arr[c]=b}else{if(!(a<this.table.columns.length))throw"Column #"+a+" is out of the range of this table";this.arr[a]=b;var d=this.table.columns[a];this.obj[d]=b}},d.TableRow.prototype.setNum=function(a,b){var c=parseFloat(b,10);this.set(a,c)},d.TableRow.prototype.setString=function(a,b){var c=b.toString();this.set(a,c)},d.TableRow.prototype.get=function(a){return"string"==typeof a?this.obj[a]:this.arr[a]},d.TableRow.prototype.getNum=function(a){var b;if(b="string"==typeof a?parseFloat(this.obj[a],10):parseFloat(this.arr[a],10),"NaN"===b.toString())throw"Error: "+this.obj[a]+" is NaN (Not a Number)";return b},d.TableRow.prototype.getString=function(a){return"string"==typeof a?this.obj[a].toString():this.arr[a].toString()},b.exports=d.TableRow},{"../core/core":50}],75:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.abs=Math.abs,d.prototype.ceil=Math.ceil,d.prototype.constrain=function(a,b,c){return Math.max(Math.min(a,c),b)},d.prototype.dist=function(a,b,c,d,e,f){return 4===arguments.length?Math.sqrt((c-a)*(c-a)+(d-b)*(d-b)):6===arguments.length?Math.sqrt((d-a)*(d-a)+(e-b)*(e-b)+(f-c)*(f-c)):void 0},d.prototype.exp=Math.exp,d.prototype.floor=Math.floor,d.prototype.lerp=function(a,b,c){return c*(b-a)+a},d.prototype.log=Math.log,d.prototype.mag=function(a,b){return Math.sqrt(a*a+b*b)},d.prototype.map=function(a,b,c,d,e){return(a-b)/(c-b)*(e-d)+d},d.prototype.max=function(){return arguments[0]instanceof Array?Math.max.apply(null,arguments[0]):Math.max.apply(null,arguments)},d.prototype.min=function(){return arguments[0]instanceof Array?Math.min.apply(null,arguments[0]):Math.min.apply(null,arguments)},d.prototype.norm=function(a,b,c){return this.map(a,b,c,0,1)},d.prototype.pow=Math.pow,d.prototype.round=Math.round,d.prototype.sq=function(a){return a*a},d.prototype.sqrt=Math.sqrt,b.exports=d},{"../core/core":50}],76:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.createVector=function(a,b,c){return this instanceof d?new d.Vector(this,arguments):new d.Vector(a,b,c)},b.exports=d},{"../core/core":50}],77:[function(a,b,c){"use strict";var d,e=a("../core/core"),f=4,g=1<<f,h=8,i=1<<h,j=4095,k=4,l=.5,m=function(a){return.5*(1-Math.cos(a*Math.PI))};e.prototype.noise=function(a,b,c){if(b=b||0,c=c||0,null==d){d=new Array(j+1);for(var e=0;j+1>e;e++)d[e]=Math.random()}0>a&&(a=-a),0>b&&(b=-b),0>c&&(c=-c);for(var n,o,p,q,r,s=Math.floor(a),t=Math.floor(b),u=Math.floor(c),v=a-s,w=b-t,x=c-u,y=0,z=.5,A=0;k>A;A++){var B=s+(t<<f)+(u<<h);n=m(v),o=m(w),p=d[B&j],p+=n*(d[B+1&j]-p),q=d[B+g&j],q+=n*(d[B+g+1&j]-q),p+=o*(q-p),B+=i,q=d[B&j],q+=n*(d[B+1&j]-q),r=d[B+g&j],r+=n*(d[B+g+1&j]-r),q+=o*(r-q),p+=m(x)*(q-p),y+=p*z,z*=l,s<<=1,v*=2,t<<=1,w*=2,u<<=1,x*=2,v>=1&&(s++,v--),w>=1&&(t++,w--),x>=1&&(u++,x--)}return y},e.prototype.noiseDetail=function(a,b){a>0&&(k=a),b>0&&(l=b)},e.prototype.noiseSeed=function(a){var b=function(){var a,b,c=4294967296,d=1664525,e=1013904223;return{setSeed:function(d){b=a=(null==d?Math.random()*c:d)>>>0},getSeed:function(){return a},rand:function(){return b=(d*b+e)%c,b/c}}}();b.setSeed(a),d=new Array(j+1);for(var c=0;j+1>c;c++)d[c]=b.rand()},b.exports=e},{"../core/core":50}],78:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./polargeometry"),f=a("../core/constants");d.Vector=function(){var a,b,c;arguments[0]instanceof d?(this.p5=arguments[0],a=arguments[1][0]||0,b=arguments[1][1]||0,c=arguments[1][2]||0):(a=arguments[0]||0,b=arguments[1]||0,c=arguments[2]||0),this.x=a,this.y=b,this.z=c},d.Vector.prototype.toString=function(){return"p5.Vector Object : ["+this.x+", "+this.y+", "+this.z+"]"},d.Vector.prototype.set=function(a,b,c){return a instanceof d.Vector?(this.x=a.x||0,this.y=a.y||0,this.z=a.z||0,this):a instanceof Array?(this.x=a[0]||0,this.y=a[1]||0,this.z=a[2]||0,this):(this.x=a||0,this.y=b||0,this.z=c||0,this)},d.Vector.prototype.copy=function(){return this.p5?new d.Vector(this.p5,[this.x,this.y,this.z]):new d.Vector(this.x,this.y,this.z)},d.Vector.prototype.add=function(a,b,c){return a instanceof d.Vector?(this.x+=a.x||0,this.y+=a.y||0,this.z+=a.z||0,this):a instanceof Array?(this.x+=a[0]||0,this.y+=a[1]||0,this.z+=a[2]||0,this):(this.x+=a||0,this.y+=b||0,this.z+=c||0,this)},d.Vector.prototype.sub=function(a,b,c){return a instanceof d.Vector?(this.x-=a.x||0,this.y-=a.y||0,this.z-=a.z||0,this):a instanceof Array?(this.x-=a[0]||0,this.y-=a[1]||0,this.z-=a[2]||0,this):(this.x-=a||0,this.y-=b||0,this.z-=c||0,this)},d.Vector.prototype.mult=function(a){return this.x*=a||0,this.y*=a||0,this.z*=a||0,this},d.Vector.prototype.div=function(a){return this.x/=a,this.y/=a,this.z/=a,this},d.Vector.prototype.mag=function(){return Math.sqrt(this.magSq())},d.Vector.prototype.magSq=function(){var a=this.x,b=this.y,c=this.z;return a*a+b*b+c*c},d.Vector.prototype.dot=function(a,b,c){return a instanceof d.Vector?this.dot(a.x,a.y,a.z):this.x*(a||0)+this.y*(b||0)+this.z*(c||0)},d.Vector.prototype.cross=function(a){var b=this.y*a.z-this.z*a.y,c=this.z*a.x-this.x*a.z,e=this.x*a.y-this.y*a.x;return this.p5?new d.Vector(this.p5,[b,c,e]):new d.Vector(b,c,e)},d.Vector.prototype.dist=function(a){var b=a.copy().sub(this);return b.mag()},d.Vector.prototype.normalize=function(){return this.div(this.mag())},d.Vector.prototype.limit=function(a){var b=this.magSq();return b>a*a&&(this.div(Math.sqrt(b)),this.mult(a)),this},d.Vector.prototype.setMag=function(a){return this.normalize().mult(a)},d.Vector.prototype.heading=function(){var a=Math.atan2(this.y,this.x);return this.p5?this.p5._angleMode===f.RADIANS?a:e.radiansToDegrees(a):a},d.Vector.prototype.rotate=function(a){this.p5&&this.p5._angleMode===f.DEGREES&&(a=e.degreesToRadians(a));var b=this.heading()+a,c=this.mag();return this.x=Math.cos(b)*c,this.y=Math.sin(b)*c,this},d.Vector.prototype.lerp=function(a,b,c,e){return a instanceof d.Vector?this.lerp(a.x,a.y,a.z,b):(this.x+=(a-this.x)*e||0,this.y+=(b-this.y)*e||0,this.z+=(c-this.z)*e||0,this)},d.Vector.prototype.array=function(){return[this.x||0,this.y||0,this.z||0]},d.Vector.prototype.equals=function(a,b,c){var e,f,g;return a instanceof d.Vector?(e=a.x||0,f=a.y||0,g=a.z||0):a instanceof Array?(e=a[0]||0,f=a[1]||0,g=a[2]||0):(e=a||0,f=b||0,g=c||0),this.x===e&&this.y===f&&this.z===g},d.Vector.fromAngle=function(a){return this.p5&&this.p5._angleMode===f.DEGREES&&(a=e.degreesToRadians(a)),this.p5?new d.Vector(this.p5,[Math.cos(a),Math.sin(a),0]):new d.Vector(Math.cos(a),Math.sin(a),0)},d.Vector.random2D=function(){var a;return a=this.p5?this.p5._angleMode===f.DEGREES?this.p5.random(360):this.p5.random(f.TWO_PI):Math.random()*Math.PI*2,this.fromAngle(a)},d.Vector.random3D=function(){var a,b;this.p5?(a=this.p5.random(0,f.TWO_PI),b=this.p5.random(-1,1)):(a=Math.random()*Math.PI*2,b=2*Math.random()-1);var c=Math.sqrt(1-b*b)*Math.cos(a),e=Math.sqrt(1-b*b)*Math.sin(a);return this.p5?new d.Vector(this.p5,[c,e,b]):new d.Vector(c,e,b)},d.Vector.add=function(a,b,c){return c?c.set(a):c=a.copy(),c.add(b),c},d.Vector.sub=function(a,b,c){return c?c.set(a):c=a.copy(),c.sub(b),c},d.Vector.mult=function(a,b,c){return c?c.set(a):c=a.copy(),c.mult(b),c},d.Vector.div=function(a,b,c){return c?c.set(a):c=a.copy(),c.div(b),c},d.Vector.dot=function(a,b){return a.dot(b)},d.Vector.cross=function(a,b){return a.cross(b)},d.Vector.dist=function(a,b){return a.dist(b)},d.Vector.lerp=function(a,b,c,d){return d?d.set(a):d=a.copy(),d.lerp(b,c),d},d.Vector.angleBetween=function(a,b){var c=Math.acos(a.dot(b)/(a.mag()*b.mag()));return this.p5&&this.p5._angleMode===f.DEGREES&&(c=e.radiansToDegrees(c)),c},b.exports=d.Vector},{"../core/constants":49,"../core/core":50,"./polargeometry":79}],79:[function(a,b,c){b.exports={degreesToRadians:function(a){return 2*Math.PI*a/360},radiansToDegrees:function(a){return 360*a/(2*Math.PI)}}},{}],80:[function(a,b,c){"use strict";var d=a("../core/core"),e=!1,f=function(){var a,b,c=4294967296,d=1664525,e=1013904223;return{setSeed:function(d){b=a=(null==d?Math.random()*c:d)>>>0},getSeed:function(){return a},rand:function(){return b=(d*b+e)%c,b/c}}}();d.prototype.randomSeed=function(a){f.setSeed(a),e=!0},d.prototype.random=function(a,b){var c;if(c=e?f.rand():Math.random(),0===arguments.length)return c;if(1===arguments.length)return c*a;if(a>b){var d=a;a=b,b=d}return c*(b-a)+a};var g,h=!1;d.prototype.randomGaussian=function(a,b){var c,d,e,f;if(h)c=g,h=!1;else{do d=this.random(2)-1,e=this.random(2)-1,f=d*d+e*e;while(f>=1);f=Math.sqrt(-2*Math.log(f)/f),c=d*f,g=e*f,h=!0}var i=a||0,j=b||1;return c*j+i},b.exports=d},{"../core/core":50}],81:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./polargeometry"),f=a("../core/constants");d.prototype._angleMode=f.RADIANS,d.prototype.acos=function(a){return this._angleMode===f.RADIANS?Math.acos(a):e.radiansToDegrees(Math.acos(a))},d.prototype.asin=function(a){return this._angleMode===f.RADIANS?Math.asin(a):e.radiansToDegrees(Math.asin(a))},d.prototype.atan=function(a){return this._angleMode===f.RADIANS?Math.atan(a):e.radiansToDegrees(Math.atan(a))},d.prototype.atan2=function(a,b){return this._angleMode===f.RADIANS?Math.atan2(a,b):e.radiansToDegrees(Math.atan2(a,b))},d.prototype.cos=function(a){return this._angleMode===f.RADIANS?Math.cos(a):Math.cos(this.radians(a))},d.prototype.sin=function(a){return this._angleMode===f.RADIANS?Math.sin(a):Math.sin(this.radians(a))},d.prototype.tan=function(a){return this._angleMode===f.RADIANS?Math.tan(a):Math.tan(this.radians(a))},d.prototype.degrees=function(a){return e.radiansToDegrees(a)},d.prototype.radians=function(a){return e.degreesToRadians(a)},d.prototype.angleMode=function(a){(a===f.DEGREES||a===f.RADIANS)&&(this._angleMode=a)},b.exports=d},{"../core/constants":49,"../core/core":50,"./polargeometry":79}],82:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.textAlign=function(a,b){return this._renderer.textAlign.apply(this._renderer,arguments)},d.prototype.textLeading=function(a){return this._renderer.textLeading.apply(this._renderer,arguments)},d.prototype.textSize=function(a){return this._renderer.textSize.apply(this._renderer,arguments)},d.prototype.textStyle=function(a){return this._renderer.textStyle.apply(this._renderer,arguments)},d.prototype.textWidth=function(a){return this._renderer.textWidth.apply(this._renderer,arguments)},d.prototype.textAscent=function(){return this._renderer.textAscent()},d.prototype.textDescent=function(){return this._renderer.textDescent()},d.prototype._updateTextMetrics=function(){return this._renderer._updateTextMetrics()},b.exports=d},{"../core/core":50}],83:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../core/constants");a("../core/error_helpers"),d.prototype.text=function(a,b,c,d,e){for(var f=new Array(arguments.length),g=0;g<f.length;++g)f[g]=arguments[g];return this._validateParameters("text",f,[["*","Number","Number"],["*","Number","Number","Number","Number"]]),this._renderer._doFill||this._renderer._doStroke?this._renderer.text.apply(this._renderer,arguments):this},d.prototype.textFont=function(a,b){if(arguments.length){if(!a)throw Error("null font passed to textFont");return this._renderer._setProperty("_textFont",a),b&&(this._renderer._setProperty("_textSize",b),this._renderer._setProperty("_textLeading",b*e._DEFAULT_LEADMULT)),this._renderer._applyTextProperties()}return this},b.exports=d},{"../core/constants":49,"../core/core":50,"../core/error_helpers":53}],84:[function(a,b,c){"use strict";function d(a,b){for(var c=h(b,{sampleFactor:.1,simplifyThreshold:0}),d=n(a,0,1),f=d/(d*c.sampleFactor),g=[],i=0;d>i;i+=f)g.push(n(a,i));return c.simplifyThreshold&&e(g,c.simplifyThreshold),g}function e(a,b){b="undefined"==typeof b?0:b;for(var c=0,d=a.length-1;a.length>3&&d>=0;--d)j(i(a,d-1),i(a,d),i(a,d+1),b)&&(a.splice(d%a.length,1),c++);return c}function f(a){for(var b,c=[],d=0;d<a.length;d++)"M"===a[d].type&&(b&&c.push(b),b=[]),b.push(g(a[d]));return c.push(b),c}function g(a){var b=[a.type];return"M"===a.type||"L"===a.type?b.push(a.x,a.y):"C"===a.type?b.push(a.x1,a.y1,a.x2,a.y2,a.x,a.y):"Q"===a.type&&b.push(a.x1,a.y1,a.x,a.y),b}function h(a,b){if("object"!=typeof a)a=b;else for(var c in b)"undefined"==typeof a[c]&&(a[c]=b[c]);return a}function i(a,b){var c=a.length;return a[0>b?b%c+c:b%c]}function j(a,b,c,d){if(!d)return 0===k(a,b,c);"undefined"==typeof j.tmpPoint1&&(j.tmpPoint1=[],j.tmpPoint2=[]);var e=j.tmpPoint1,f=j.tmpPoint2;e.x=b.x-a.x,e.y=b.y-a.y,f.x=c.x-b.x,f.y=c.y-b.y;var g=e.x*f.x+e.y*f.y,h=Math.sqrt(e.x*e.x+e.y*e.y),i=Math.sqrt(f.x*f.x+f.y*f.y),l=Math.acos(g/(h*i));return d>l}function k(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1])}function l(a,b,c,d,e,f,g,h,i){var j=1-i,k=Math.pow(j,3),l=Math.pow(j,2),m=i*i,n=m*i,o=k*a+3*l*i*c+3*j*i*i*e+n*g,p=k*b+3*l*i*d+3*j*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,w=j*e+i*g,x=j*f+i*h,y=90-180*Math.atan2(q-s,r-t)/Math.PI;return(q>s||t>r)&&(y+=180),{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:w,y:x},alpha:y}}function m(a,b,c,d,e,f,g,h,i){return null==i?u(a,b,c,d,e,f,g,h):l(a,b,c,d,e,f,g,h,v(a,b,c,d,e,f,g,h,i))}function n(a,b,c){a=p(a);for(var d,e,f,g,h,i="",j={},k=0,n=0,o=a.length;o>n;n++){if(f=a[n],"M"===f[0])d=+f[1],e=+f[2];else{if(g=m(d,e,f[1],f[2],f[3],f[4],f[5],f[6]),k+g>b&&!c)return h=m(d,e,f[1],f[2],f[3],f[4],f[5],f[6],b-k),{x:h.x,y:h.y,alpha:h.alpha};k+=g,d=+f[5],e=+f[6]}i+=f.shift()+f}return j.end=i,h=c?k:l(d,e,f[0],f[1],f[2],f[3],f[4],f[5],1),h.alpha&&(h={x:h.x,y:h.y,alpha:h.alpha}),h}function o(a){var b=[],c=0,d=0,e=0,f=0,g=0;"M"===a[0][0]&&(c=+a[0][1],d=+a[0][2],e=c,f=d,g++,b[0]=["M",c,d]);for(var h,i,j,k=3===a.length&&"M"===a[0][0]&&"R"===a[1][0].toUpperCase()&&"Z"===a[2][0].toUpperCase(),l=g,m=a.length;m>l;l++){if(b.push(i=[]),j=a[l],j[0]!==String.prototype.toUpperCase.call(j[0]))switch(i[0]=String.prototype.toUpperCase.call(j[0]),i[0]){case"A":i[1]=j[1],i[2]=j[2],i[3]=j[3],i[4]=j[4],i[5]=j[5],i[6]=+(j[6]+c),i[7]=+(j[7]+d);break;case"V":i[1]=+j[1]+d;break;case"H":i[1]=+j[1]+c;break;case"R":h=[c,d].concat(j.slice(1));for(var n=2,o=h.length;o>n;n++)h[n]=+h[n]+c,h[++n]=+h[n]+d;b.pop(),b=b.concat(r(h,k));break;case"M":e=+j[1]+c,f=+j[2]+d;break;default:for(n=1,o=j.length;o>n;n++)i[n]=+j[n]+(n%2?c:d)}else if("R"===j[0])h=[c,d].concat(j.slice(1)),b.pop(),b=b.concat(r(h,k)),i=["R"].concat(j.slice(-2));else for(var p=0,q=j.length;q>p;p++)i[p]=j[p];switch(i[0]){case"Z":c=e,d=f;break;case"H":c=i[1];break;case"V":d=i[1];break;case"M":e=i[i.length-2],f=i[i.length-1];break;default:c=i[i.length-2],d=i[i.length-1]}}return b}function p(a,b){for(var c=o(a),d=b&&o(b),e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},f={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},g=(function(a,b,c){var d,e,f={T:1,Q:1};if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];switch(a[0]in f||(b.qx=b.qy=null),a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"].concat(q.apply(0,[b.x,b.y].concat(a.slice(1))));break;case"S":"C"===c||"S"===c?(d=2*b.x-b.bx,e=2*b.y-b.by):(d=b.x,e=b.y),a=["C",d,e].concat(a.slice(1));break;case"T":"Q"===c||"T"===c?(b.qx=2*b.x-b.qx,b.qy=2*b.y-b.qy):(b.qx=b.x,b.qy=b.y),a=["C"].concat(t(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"].concat(t(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"].concat(s(b.x,b.y,a[1],a[2]));break;case"H":a=["C"].concat(s(b.x,b.y,a[1],b.y));break;case"V":a=["C"].concat(s(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"].concat(s(b.x,b.y,b.X,b.Y))}return a}),h=function(a,b){if(a[b].length>7){a[b].shift();for(var e=a[b];e.length;)j[b]="A",d&&(k[b]="A"),a.splice(b++,0,["C"].concat(e.splice(0,6)));a.splice(b,1),p=Math.max(c.length,d&&d.length||0)}},i=function(a,b,e,f,g){a&&b&&"M"===a[g][0]&&"M"!==b[g][0]&&(b.splice(g,0,["M",f.x,f.y]),e.bx=0,e.by=0,e.x=a[g][1],e.y=a[g][2],p=Math.max(c.length,d&&d.length||0))},j=[],k=[],l="",m="",n=0,p=Math.max(c.length,d&&d.length||0);p>n;n++){c[n]&&(l=c[n][0]),"C"!==l&&(j[n]=l,n&&(m=j[n-1])),c[n]=g(c[n],e,m),"A"!==j[n]&&"C"===l&&(j[n]="C"),h(c,n),d&&(d[n]&&(l=d[n][0]),"C"!==l&&(k[n]=l,n&&(m=k[n-1])),d[n]=g(d[n],f,m),"A"!==k[n]&&"C"===l&&(k[n]="C"),h(d,n)),i(c,d,e,f,n),i(d,c,f,e,n);var r=c[n],u=d&&d[n],v=r.length,w=d&&u.length;e.x=r[v-2],e.y=r[v-1],e.bx=parseFloat(r[v-4])||e.x,e.by=parseFloat(r[v-3])||e.y,f.bx=d&&(parseFloat(u[w-4])||f.x),f.by=d&&(parseFloat(u[w-3])||f.y),f.x=d&&u[w-2],f.y=d&&u[w-1]}return d?[c,d]:c}function q(a,b,c,d,e,f,g,h,i,j){var k,l,m,n,o,p=Math.PI,r=120*p/180,s=p/180*(+e||0),t=[],u=function(a,b,c){var d=a*Math.cos(c)-b*Math.sin(c),e=a*Math.sin(c)+b*Math.cos(c);return{x:d,y:e}};if(j)k=j[0],l=j[1],m=j[2],n=j[3];else{o=u(a,b,-s),a=o.x,b=o.y,o=u(h,i,-s),h=o.x,i=o.y;var v=(a-h)/2,w=(b-i)/2,x=v*v/(c*c)+w*w/(d*d);x>1&&(x=Math.sqrt(x),c=x*c,d=x*d);var y=c*c,z=d*d,A=(f===g?-1:1)*Math.sqrt(Math.abs((y*z-y*w*w-z*v*v)/(y*w*w+z*v*v)));m=A*c*w/d+(a+h)/2,n=A*-d*v/c+(b+i)/2,k=Math.asin(((b-n)/d).toFixed(9)),l=Math.asin(((i-n)/d).toFixed(9)),k=m>a?p-k:k,l=m>h?p-l:l,0>k&&(k=2*p+k),0>l&&(l=2*p+l),g&&k>l&&(k-=2*p),!g&&l>k&&(l-=2*p)}var B=l-k;if(Math.abs(B)>r){var C=l,D=h,E=i;l=k+r*(g&&l>k?1:-1),h=m+c*Math.cos(l),i=n+d*Math.sin(l),t=q(h,i,c,d,e,0,g,D,E,[l,C,m,n])}B=l-k;var F=Math.cos(k),G=Math.sin(k),H=Math.cos(l),I=Math.sin(l),J=Math.tan(B/4),K=4/3*c*J,L=4/3*d*J,M=[a,b],N=[a+K*G,b-L*F],O=[h+K*I,i-L*H],P=[h,i];if(N[0]=2*M[0]-N[0],N[1]=2*M[1]-N[1],j)return[N,O,P].concat(t);t=[N,O,P].concat(t).join().split(",");for(var Q=[],R=0,S=t.length;S>R;R++)Q[R]=R%2?u(t[R-1],t[R],s).y:u(t[R],t[R+1],s).x;return Q}function r(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],
y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4===d?f[3]={x:+a[0],y:+a[1]}:e-2===d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4===d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push(["C",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}function s(a,b,c,d){return[a,b,c,d,c,d]}function t(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]}function u(a,b,c,d,e,f,g,h,i){null==i&&(i=1),i=i>1?1:0>i?0:i;for(var j=i/2,k=12,l=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],m=0,n=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],o=0;k>o;o++){var p=j*l[o]+j,q=w(p,a,c,e,g),r=w(p,b,d,f,h),s=q*q+r*r;m+=n[o]*Math.sqrt(s)}return j*m}function v(a,b,c,d,e,f,g,h,i){if(!(0>i||u(a,b,c,d,e,f,g,h)<i)){var j,k=1,l=k/2,m=k-l,n=.01;for(j=u(a,b,c,d,e,f,g,h,m);Math.abs(j-i)>n;)l/=2,m+=(i>j?1:-1)*l,j=u(a,b,c,d,e,f,g,h,m);return m}}function w(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c}function x(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];b=a.length;for(var c="";b--;)c+=a[b]===Object(a[b])?JSON.stringify(a[b]):a[b];return c}var y=a("../core/core"),z=a("../core/constants");y.Font=function(a){this.parent=a,this.cache={},this.font=void 0},y.Font.prototype.list=function(){throw"not yet implemented"},y.Font.prototype.textBounds=function(a,b,c,d,e){b=void 0!==b?b:0,c=void 0!==c?c:0,d=d||this.parent._renderer._textSize;var f=this.cache[x("textBounds",a,b,c,d)];if(!f){var g,h,i,j,k=[],l=[],m=this,n=this._scale(d);this.font.forEachGlyph(a,b,c,d,e,function(a,b,c,e){k.push(b),l.push(c);var f=a.getMetrics();"space"!==a.name?(k.push(b+f.xMax*n),l.push(c+-f.yMin*n),l.push(c+-f.yMax*n)):k.push(b+m.font.charToGlyph(" ").advanceWidth*m._scale(d))}),g=Math.max(0,Math.min.apply(null,k)),h=Math.max(0,Math.min.apply(null,l)),i=Math.max(0,Math.max.apply(null,k)),j=Math.max(0,Math.max.apply(null,l)),f={x:g,y:h,h:j-h,w:i-g,advance:g-b},this.cache[x("textBounds",a,b,c,d)]=f}return f},y.Font.prototype.textToPoints=function(a,b,c,e,g){var h=0,i=[],j=this._getGlyphs(a);e=e||this.parent._renderer._textSize;for(var k=0;k<j.length;k++){for(var l=j[k].getPath(b,c,e),m=f(l.commands),n=0;n<m.length;n++)for(var o=d(m[n],g),p=0;p<o.length;p++)o[p].x+=h,i.push(o[p]);h+=j[k].advanceWidth*this._scale(e)}return i},y.Font.prototype._getGlyphs=function(a){return this.font.stringToGlyphs(a)},y.Font.prototype._getPath=function(a,b,c,d){var e=this.parent,f=e._renderer.drawingContext,g=this._handleAlignment(e,f,a,b,c);return this.font.getPath(a,g.x,g.y,e._renderer._textSize,d)},y.Font.prototype._getPathData=function(a,b,c,d){var e=3;return"string"==typeof a&&arguments.length>2?a=this._getPath(a,b,c,d):"object"==typeof b&&(d=b),d&&"number"==typeof d.decimals&&(e=d.decimals),a.toPathData(e)},y.Font.prototype._getSVG=function(a,b,c,d){var e=3;return"string"==typeof a&&arguments.length>2?a=this._getPath(a,b,c,d):"object"==typeof b&&(d=b),d&&("number"==typeof d.decimals&&(e=d.decimals),"number"==typeof d.strokeWidth&&(a.strokeWidth=d.strokeWidth),"undefined"!=typeof d.fill&&(a.fill=d.fill),"undefined"!=typeof d.stroke&&(a.stroke=d.stroke)),a.toSVG(e)},y.Font.prototype._renderPath=function(a,b,c,d){var e,f=d&&d.renderer||this.parent._renderer,g=f.drawingContext;e="object"==typeof a&&a.commands?a.commands:this._getPath(a,b,c,f._textSize,d).commands,g.beginPath();for(var h=0;h<e.length;h+=1){var i=e[h];"M"===i.type?g.moveTo(i.x,i.y):"L"===i.type?g.lineTo(i.x,i.y):"C"===i.type?g.bezierCurveTo(i.x1,i.y1,i.x2,i.y2,i.x,i.y):"Q"===i.type?g.quadraticCurveTo(i.x1,i.y1,i.x,i.y):"Z"===i.type&&g.closePath()}return f._doStroke&&f._strokeSet&&g.stroke(),f._doFill&&(g.fillStyle=f._fillSet?g.fillStyle:z._DEFAULT_TEXT_FILL,g.fill()),this},y.Font.prototype._textWidth=function(a,b){if(" "===a)return this.font.charToGlyph(" ").advanceWidth*this._scale(b);var c=this.textBounds(a,0,0,b);return c.w+c.advance},y.Font.prototype._textAscent=function(a){return this.font.ascender*this._scale(a)},y.Font.prototype._textDescent=function(a){return-this.font.descender*this._scale(a)},y.Font.prototype._scale=function(a){return 1/this.font.unitsPerEm*(a||this.parent._renderer._textSize)},y.Font.prototype._handleAlignment=function(a,b,c,d,e){var f=this._textWidth(c),g=this._textAscent(),h=this._textDescent(),i=g+h;return b.textAlign===z.CENTER?d-=f/2:b.textAlign===z.RIGHT&&(d-=f),b.textBaseline===z.TOP?e+=i:b.textBaseline===z._CTX_MIDDLE?e+=i/2-h:b.textBaseline===z.BOTTOM&&(e-=h),{x:d,y:e}},b.exports=y.Font},{"../core/constants":49,"../core/core":50}],85:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.append=function(a,b){return a.push(b),a},d.prototype.arrayCopy=function(a,b,c,d,e){var f,g;"undefined"!=typeof e?(g=Math.min(e,a.length),f=d,a=a.slice(b,g+b)):("undefined"!=typeof c?(g=c,g=Math.min(g,a.length)):g=a.length,f=0,c=b,a=a.slice(0,g)),Array.prototype.splice.apply(c,[f,g].concat(a))},d.prototype.concat=function(a,b){return a.concat(b)},d.prototype.reverse=function(a){return a.reverse()},d.prototype.shorten=function(a){return a.pop(),a},d.prototype.shuffle=function(a,b){var c=ArrayBuffer&&ArrayBuffer.isView&&ArrayBuffer.isView(a);a=b||c?a:a.slice();for(var d,e,f=a.length;f>1;)d=Math.random()*f|0,e=a[--f],a[f]=a[d],a[d]=e;return a},d.prototype.sort=function(a,b){var c=b?a.slice(0,Math.min(b,a.length)):a,d=b?a.slice(Math.min(b,a.length)):[];return c="string"==typeof c[0]?c.sort():c.sort(function(a,b){return a-b}),c.concat(d)},d.prototype.splice=function(a,b,c){return Array.prototype.splice.apply(a,[c,0].concat(b)),a},d.prototype.subset=function(a,b,c){return"undefined"!=typeof c?a.slice(b,b+c):a.slice(b,a.length)},b.exports=d},{"../core/core":50}],86:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype["float"]=function(a){return parseFloat(a)},d.prototype["int"]=function(a,b){return"string"==typeof a?(b=b||10,parseInt(a,b)):"number"==typeof a?0|a:"boolean"==typeof a?a?1:0:a instanceof Array?a.map(function(a){return d.prototype["int"](a,b)}):void 0},d.prototype.str=function(a){return a instanceof Array?a.map(d.prototype.str):String(a)},d.prototype["boolean"]=function(a){return"number"==typeof a?0!==a:"string"==typeof a?"true"===a.toLowerCase():"boolean"==typeof a?a:a instanceof Array?a.map(d.prototype["boolean"]):void 0},d.prototype["byte"]=function(a){var b=d.prototype["int"](a,10);return"number"==typeof b?(b+128)%256-128:b instanceof Array?b.map(d.prototype["byte"]):void 0},d.prototype["char"]=function(a){return"number"!=typeof a||isNaN(a)?a instanceof Array?a.map(d.prototype["char"]):"string"==typeof a?d.prototype["char"](parseInt(a,10)):void 0:String.fromCharCode(a)},d.prototype.unchar=function(a){return"string"==typeof a&&1===a.length?a.charCodeAt(0):a instanceof Array?a.map(d.prototype.unchar):void 0},d.prototype.hex=function(a,b){if(b=void 0===b||null===b?b=8:b,a instanceof Array)return a.map(function(a){return d.prototype.hex(a,b)});if("number"==typeof a){0>a&&(a=4294967295+a+1);for(var c=Number(a).toString(16).toUpperCase();c.length<b;)c="0"+c;return c.length>=b&&(c=c.substring(c.length-b,c.length)),c}},d.prototype.unhex=function(a){return a instanceof Array?a.map(d.prototype.unhex):parseInt("0x"+a,16)},b.exports=d},{"../core/core":50}],87:[function(a,b,c){"use strict";function d(){var a=arguments[0],b=0>a,c=b?a.toString().substring(1):a.toString(),d=c.indexOf("."),e=-1!==d?c.substring(0,d):c,f=-1!==d?c.substring(d+1):"",g=b?"-":"";if(3===arguments.length){var h="";(-1!==d||arguments[2]-f.length>0)&&(h="."),f.length>arguments[2]&&(f=f.substring(0,arguments[2]));for(var i=0;i<arguments[1]-e.length;i++)g+="0";g+=e,g+=h,g+=f;for(var j=0;j<arguments[2]-f.length;j++)g+="0";return g}for(var k=0;k<Math.max(arguments[1]-e.length,0);k++)g+="0";return g+=c}function e(){var a=arguments[0].toString(),b=a.indexOf("."),c=-1!==b?a.substring(b):"",d=-1!==b?a.substring(0,b):a;if(d=d.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),0===arguments[1])c="";else if(void 0!==arguments[1])if(arguments[1]>c.length){c+=-1===b?".":"";for(var e=arguments[1]-c.length+1,f=0;e>f;f++)c+="0"}else c=c.substring(0,arguments[1]+1);return d+c}function f(){return parseFloat(arguments[0])>0?"+"+arguments[0].toString():arguments[0].toString()}function g(){return parseFloat(arguments[0])>0?" "+arguments[0].toString():arguments[0].toString()}var h=a("../core/core");h.prototype.join=function(a,b){return a.join(b)},h.prototype.match=function(a,b){return a.match(b)},h.prototype.matchAll=function(a,b){for(var c=new RegExp(b,"g"),d=c.exec(a),e=[];null!==d;)e.push(d),d=c.exec(a);return e},h.prototype.nf=function(){if(arguments[0]instanceof Array){var a=arguments[1],b=arguments[2];return arguments[0].map(function(c){return d(c,a,b)})}var c=Object.prototype.toString.call(arguments[0]);return"[object Arguments]"===c?3===arguments[0].length?this.nf(arguments[0][0],arguments[0][1],arguments[0][2]):2===arguments[0].length?this.nf(arguments[0][0],arguments[0][1]):this.nf(arguments[0][0]):d.apply(this,arguments)},h.prototype.nfc=function(){if(arguments[0]instanceof Array){var a=arguments[1];return arguments[0].map(function(b){return e(b,a)})}return e.apply(this,arguments)},h.prototype.nfp=function(){var a=this.nf.apply(this,arguments);return a instanceof Array?a.map(f):f(a)},h.prototype.nfs=function(){var a=this.nf.apply(this,arguments);return a instanceof Array?a.map(g):g(a)},h.prototype.split=function(a,b){return a.split(b)},h.prototype.splitTokens=function(){var a,b,c,d;return d=arguments[1],arguments.length>1?(c=/\]/g.exec(d),b=/\[/g.exec(d),b&&c?(d=d.slice(0,c.index)+d.slice(c.index+1),b=/\[/g.exec(d),d=d.slice(0,b.index)+d.slice(b.index+1),a=new RegExp("[\\["+d+"\\]]","g")):c?(d=d.slice(0,c.index)+d.slice(c.index+1),a=new RegExp("["+d+"\\]]","g")):b?(d=d.slice(0,b.index)+d.slice(b.index+1),a=new RegExp("["+d+"\\[]","g")):a=new RegExp("["+d+"]","g")):a=/\s/g,arguments[0].split(a).filter(function(a){return a})},h.prototype.trim=function(a){return a instanceof Array?a.map(this.trim):a.trim()},b.exports=h},{"../core/core":50}],88:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.day=function(){return(new Date).getDate()},d.prototype.hour=function(){return(new Date).getHours()},d.prototype.minute=function(){return(new Date).getMinutes()},d.prototype.millis=function(){return window.performance.now()},d.prototype.month=function(){return(new Date).getMonth()+1},d.prototype.second=function(){return(new Date).getSeconds()},d.prototype.year=function(){return(new Date).getFullYear()},b.exports=d},{"../core/core":50}]},{},[41])(41)});p5.prototype._validateParameters = function() {};p5.prototype._friendlyFileLoadError = function() {};
/*! p5.sound.min.js v0.3.6 2017-10-25 */

/**
 *  p5.sound 
 *  https://p5js.org/reference/#/libraries/p5.sound
 *
 *  From the Processing Foundation and contributors
 *  https://github.com/processing/p5.js-sound/graphs/contributors
 *
 *  MIT License (MIT)
 *  https://github.com/processing/p5.js-sound/blob/master/LICENSE
 *
 *  Some of the many audio libraries & resources that inspire p5.sound:
 *   - TONE.js (c) Yotam Mann. Licensed under The MIT License (MIT). https://github.com/TONEnoTONE/Tone.js
 *   - buzz.js (c) Jay Salvat. Licensed under The MIT License (MIT). http://buzz.jaysalvat.com/
 *   - Boris Smus Web Audio API book, 2013. Licensed under the Apache License http://www.apache.org/licenses/LICENSE-2.0
 *   - wavesurfer.js https://github.com/katspaugh/wavesurfer.js
 *   - Web Audio Components by Jordan Santell https://github.com/web-audio-components
 *   - Wilm Thoben's Sound library for Processing https://github.com/processing/processing/tree/master/java/libraries/sound
 *
 *   Web Audio API: http://w3.org/TR/webaudio/
 */


!function(t,e){"function"==typeof define&&define.amd?define("p5.sound",["p5"],function(t){e(t)}):e("object"==typeof exports?require("../p5"):t.p5)}(this,function(p5){var sndcore;sndcore=function(){!function(){function t(t){t&&(t.setTargetAtTime||(t.setTargetAtTime=t.setTargetValueAtTime))}window.hasOwnProperty("webkitAudioContext")&&!window.hasOwnProperty("AudioContext")&&(window.AudioContext=window.webkitAudioContext,"function"!=typeof AudioContext.prototype.createGain&&(AudioContext.prototype.createGain=AudioContext.prototype.createGainNode),"function"!=typeof AudioContext.prototype.createDelay&&(AudioContext.prototype.createDelay=AudioContext.prototype.createDelayNode),"function"!=typeof AudioContext.prototype.createScriptProcessor&&(AudioContext.prototype.createScriptProcessor=AudioContext.prototype.createJavaScriptNode),"function"!=typeof AudioContext.prototype.createPeriodicWave&&(AudioContext.prototype.createPeriodicWave=AudioContext.prototype.createWaveTable),AudioContext.prototype.internal_createGain=AudioContext.prototype.createGain,AudioContext.prototype.createGain=function(){var e=this.internal_createGain();return t(e.gain),e},AudioContext.prototype.internal_createDelay=AudioContext.prototype.createDelay,AudioContext.prototype.createDelay=function(e){var i=e?this.internal_createDelay(e):this.internal_createDelay();return t(i.delayTime),i},AudioContext.prototype.internal_createBufferSource=AudioContext.prototype.createBufferSource,AudioContext.prototype.createBufferSource=function(){var e=this.internal_createBufferSource();return e.start?(e.internal_start=e.start,e.start=function(t,i,n){"undefined"!=typeof n?e.internal_start(t||0,i,n):e.internal_start(t||0,i||0)}):e.start=function(t,e,i){e||i?this.noteGrainOn(t||0,e,i):this.noteOn(t||0)},e.stop?(e.internal_stop=e.stop,e.stop=function(t){e.internal_stop(t||0)}):e.stop=function(t){this.noteOff(t||0)},t(e.playbackRate),e},AudioContext.prototype.internal_createDynamicsCompressor=AudioContext.prototype.createDynamicsCompressor,AudioContext.prototype.createDynamicsCompressor=function(){var e=this.internal_createDynamicsCompressor();return t(e.threshold),t(e.knee),t(e.ratio),t(e.reduction),t(e.attack),t(e.release),e},AudioContext.prototype.internal_createBiquadFilter=AudioContext.prototype.createBiquadFilter,AudioContext.prototype.createBiquadFilter=function(){var e=this.internal_createBiquadFilter();return t(e.frequency),t(e.detune),t(e.Q),t(e.gain),e},"function"!=typeof AudioContext.prototype.createOscillator&&(AudioContext.prototype.internal_createOscillator=AudioContext.prototype.createOscillator,AudioContext.prototype.createOscillator=function(){var e=this.internal_createOscillator();return e.start?(e.internal_start=e.start,e.start=function(t){e.internal_start(t||0)}):e.start=function(t){this.noteOn(t||0)},e.stop?(e.internal_stop=e.stop,e.stop=function(t){e.internal_stop(t||0)}):e.stop=function(t){this.noteOff(t||0)},e.setPeriodicWave||(e.setPeriodicWave=e.setWaveTable),t(e.frequency),t(e.detune),e})),window.hasOwnProperty("webkitOfflineAudioContext")&&!window.hasOwnProperty("OfflineAudioContext")&&(window.OfflineAudioContext=window.webkitOfflineAudioContext)}(window);var t=new window.AudioContext;p5.prototype.getAudioContext=function(){return t},navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var e=document.createElement("audio");p5.prototype.isSupported=function(){return!!e.canPlayType};var i=function(){return!!e.canPlayType&&e.canPlayType('audio/ogg; codecs="vorbis"')},n=function(){return!!e.canPlayType&&e.canPlayType("audio/mpeg;")},o=function(){return!!e.canPlayType&&e.canPlayType('audio/wav; codecs="1"')},s=function(){return!!e.canPlayType&&(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;"))},r=function(){return!!e.canPlayType&&e.canPlayType("audio/x-aiff;")};p5.prototype.isFileSupported=function(t){switch(t.toLowerCase()){case"mp3":return n();case"wav":return o();case"ogg":return i();case"aac":case"m4a":case"mp4":return s();case"aif":case"aiff":return r();default:return!1}};var a=navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?!0:!1;if(a){var u=!1,p=function(){if(!u){var e=t.createBuffer(1,1,22050),i=t.createBufferSource();i.buffer=e,i.connect(t.destination),i.start(0),console.log("start ios!"),"running"===t.state&&(u=!0)}};document.addEventListener("touchend",p,!1),document.addEventListener("touchstart",p,!1)}}();var master;master=function(){var t=function(){var t=p5.prototype.getAudioContext();this.input=t.createGain(),this.output=t.createGain(),this.limiter=t.createDynamicsCompressor(),this.limiter.threshold.value=0,this.limiter.ratio.value=20,this.audiocontext=t,this.output.disconnect(),this.inputSources=[],this.input.connect(this.limiter),this.limiter.connect(this.output),this.meter=t.createGain(),this.fftMeter=t.createGain(),this.output.connect(this.meter),this.output.connect(this.fftMeter),this.output.connect(this.audiocontext.destination),this.soundArray=[],this.parts=[],this.extensions=[]},e=new t;return p5.prototype.getMasterVolume=function(){return e.output.gain.value},p5.prototype.masterVolume=function(t,i,n){if("number"==typeof t){var i=i||0,n=n||0,o=e.audiocontext.currentTime,s=e.output.gain.value;e.output.gain.cancelScheduledValues(o+n),e.output.gain.linearRampToValueAtTime(s,o+n),e.output.gain.linearRampToValueAtTime(t,o+n+i)}else{if(!t)return e.output.gain;t.connect(e.output.gain)}},p5.prototype.soundOut=p5.soundOut=e,p5.soundOut._silentNode=e.audiocontext.createGain(),p5.soundOut._silentNode.gain.value=0,p5.soundOut._silentNode.connect(e.audiocontext.destination),e}();var helpers;helpers=function(){var t=master;return p5.prototype.sampleRate=function(){return t.audiocontext.sampleRate},p5.prototype.freqToMidi=function(t){var e=Math.log(t/440)/Math.log(2),i=Math.round(12*e)+69;return i},p5.prototype.midiToFreq=function(t){return 440*Math.pow(2,(t-69)/12)},p5.prototype.soundFormats=function(){t.extensions=[];for(var e=0;e<arguments.length;e++){if(arguments[e]=arguments[e].toLowerCase(),!(["mp3","wav","ogg","m4a","aac"].indexOf(arguments[e])>-1))throw arguments[e]+" is not a valid sound format!";t.extensions.push(arguments[e])}},p5.prototype.disposeSound=function(){for(var e=0;e<t.soundArray.length;e++)t.soundArray[e].dispose()},p5.prototype.registerMethod("remove",p5.prototype.disposeSound),p5.prototype._checkFileFormats=function(e){var i;if("string"==typeof e){i=e;var n=i.split(".").pop();if(["mp3","wav","ogg","m4a","aac"].indexOf(n)>-1)if(p5.prototype.isFileSupported(n))i=i;else for(var o=i.split("."),s=o[o.length-1],r=0;r<t.extensions.length;r++){var a=t.extensions[r],u=p5.prototype.isFileSupported(a);if(u){s="",2===o.length&&(s+=o[0]);for(var r=1;r<=o.length-2;r++){var p=o[r];s+="."+p}i=s+=".",i=i+=a;break}}else for(var r=0;r<t.extensions.length;r++){var a=t.extensions[r],u=p5.prototype.isFileSupported(a);if(u){i=i+"."+a;break}}}else if("object"==typeof e)for(var r=0;r<e.length;r++){var a=e[r].split(".").pop(),u=p5.prototype.isFileSupported(a);if(u){i=e[r];break}}return i},p5.prototype._mathChain=function(t,e,i,n,o){for(var s in t.mathOps)t.mathOps[s]instanceof o&&(t.mathOps[s].dispose(),i=s,i<t.mathOps.length-1&&(n=t.mathOps[s+1]));return t.mathOps[i-1].disconnect(),t.mathOps[i-1].connect(e),e.connect(n),t.mathOps[i]=e,t},{midiToFreq:p5.prototype.midiToFreq}}(master);var errorHandler;errorHandler=function(){var t=function(t,e,i){var n,o,s=new Error;s.name=t,s.originalStack=s.stack+e,n=s.stack+e,s.failedPath=i;var o=n.split("\n");return o=o.filter(function(t){return!t.match(/(p5.|native code|globalInit)/g)}),s.stack=o.join("\n"),s};return t}();var panner;panner=function(){var t=master,e=t.audiocontext;"undefined"!=typeof e.createStereoPanner?(p5.Panner=function(t,i){this.stereoPanner=this.input=e.createStereoPanner(),t.connect(this.stereoPanner),this.stereoPanner.connect(i)},p5.Panner.prototype.pan=function(t,i){var n=i||0,o=e.currentTime+n;this.stereoPanner.pan.linearRampToValueAtTime(t,o)},p5.Panner.prototype.inputChannels=function(){},p5.Panner.prototype.connect=function(t){this.stereoPanner.connect(t)},p5.Panner.prototype.disconnect=function(){this.stereoPanner.disconnect()}):(p5.Panner=function(t,i,n){this.input=e.createGain(),t.connect(this.input),this.left=e.createGain(),this.right=e.createGain(),this.left.channelInterpretation="discrete",this.right.channelInterpretation="discrete",n>1?(this.splitter=e.createChannelSplitter(2),this.input.connect(this.splitter),this.splitter.connect(this.left,1),this.splitter.connect(this.right,0)):(this.input.connect(this.left),this.input.connect(this.right)),this.output=e.createChannelMerger(2),this.left.connect(this.output,0,1),this.right.connect(this.output,0,0),this.output.connect(i)},p5.Panner.prototype.pan=function(t,i){var n=i||0,o=e.currentTime+n,s=(t+1)/2,r=Math.cos(s*Math.PI/2),a=Math.sin(s*Math.PI/2);this.left.gain.linearRampToValueAtTime(a,o),this.right.gain.linearRampToValueAtTime(r,o)},p5.Panner.prototype.inputChannels=function(t){1===t?(this.input.disconnect(),this.input.connect(this.left),this.input.connect(this.right)):2===t&&(this.splitter=e.createChannelSplitter(2),this.input.disconnect(),this.input.connect(this.splitter),this.splitter.connect(this.left,1),this.splitter.connect(this.right,0))},p5.Panner.prototype.connect=function(t){this.output.connect(t)},p5.Panner.prototype.disconnect=function(){this.output.disconnect()})}(master);var soundfile;soundfile=function(){function t(t,e){for(var i={},n=t.length,o=0;n>o;o++){if(t[o]>e){var s=t[o],r=new c(s,o);i[o]=r,o+=6e3}o++}return i}function e(t){for(var e=[],i=Object.keys(t).sort(),n=0;n<i.length;n++)for(var o=0;10>o;o++){var s=t[i[n]],r=t[i[n+o]];if(s&&r){var a=s.sampleIndex,u=r.sampleIndex,p=u-a;p>0&&s.intervals.push(p);var c=e.some(function(t){return t.interval===p?(t.count++,t):void 0});c||e.push({interval:p,count:1})}}return e}function i(t,e){var i=[];return t.forEach(function(t){try{var n=Math.abs(60/(t.interval/e));n=o(n);var s=i.some(function(e){return e.tempo===n?e.count+=t.count:void 0});if(!s){if(isNaN(n))return;i.push({tempo:Math.round(n),count:t.count})}}catch(r){throw r}}),i}function n(t,e,i,n){for(var s=[],r=Object.keys(t).sort(),a=0;a<r.length;a++)for(var u=r[a],p=t[u],c=0;c<p.intervals.length;c++){var h=Math.round(Math.abs(60/(p.intervals[c]/i)));h=o(h),Math.abs(h-e)<n&&s.push(p.sampleIndex/44100)}return s=s.filter(function(t,e,i){var n=i[e+1]-t;return n>.01?!0:void 0})}function o(t){if(isFinite(t)&&0!==t){for(;90>t;)t*=2;for(;t>180&&t>90;)t/=2;return t}}var s=errorHandler,r=master,a=r.audiocontext,u=helpers.midiToFreq;p5.SoundFile=function(t,e,i,n){if("undefined"!=typeof t){if("string"==typeof t||"string"==typeof t[0]){var o=p5.prototype._checkFileFormats(t);this.url=o}else if("object"==typeof t&&!(window.File&&window.FileReader&&window.FileList&&window.Blob))throw"Unable to load file because the File API is not supported";t.file&&(t=t.file),this.file=t}this._onended=function(){},this._looping=!1,this._playing=!1,this._paused=!1,this._pauseTime=0,this._cues=[],this._lastPos=0,this._counterNode=null,this._scopeNode=null,this.bufferSourceNodes=[],this.bufferSourceNode=null,this.buffer=null,this.playbackRate=1,this.input=r.audiocontext.createGain(),this.output=r.audiocontext.createGain(),this.reversed=!1,this.startTime=0,this.endTime=null,this.pauseTime=0,this.mode="sustain",this.startMillis=null,this.panPosition=0,this.panner=new p5.Panner(this.output,r.input,2),(this.url||this.file)&&this.load(e,i),r.soundArray.push(this),"function"==typeof n?this._whileLoading=n:this._whileLoading=function(){}},p5.prototype.registerPreloadMethod("loadSound",p5.prototype),p5.prototype.loadSound=function(t,e,i,n){window.location.origin.indexOf("file://")>-1&&"undefined"===window.cordova&&window.alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");var o=this,s=new p5.SoundFile(t,function(){"function"==typeof e&&e.apply(o,arguments),o._decrementPreload()},i,n);return s},p5.SoundFile.prototype.load=function(t,e){var i=this,n=(new Error).stack;if(void 0!==this.url&&""!==this.url){var o=new XMLHttpRequest;o.addEventListener("progress",function(t){i._updateProgress(t)},!1),o.open("GET",this.url,!0),o.responseType="arraybuffer",o.onload=function(){if(200===o.status)a.decodeAudioData(o.response,function(e){i.buffer=e,i.panner.inputChannels(e.numberOfChannels),t&&t(i)},function(){var t=new s("decodeAudioData",n,i.url),o="AudioContext error at decodeAudioData for "+i.url;e?(t.msg=o,e(t)):console.error(o+"\n The error stack trace includes: \n"+t.stack)});else{var r=new s("loadSound",n,i.url),u="Unable to load "+i.url+". The request status was: "+o.status+" ("+o.statusText+")";e?(r.message=u,e(r)):console.error(u+"\n The error stack trace includes: \n"+r.stack)}},o.onerror=function(){var t=new s("loadSound",n,i.url),o="There was no response from the server at "+i.url+". Check the url and internet connectivity.";e?(t.message=o,e(t)):console.error(o+"\n The error stack trace includes: \n"+t.stack)},o.send()}else if(void 0!==this.file){var r=new FileReader;r.onload=function(){a.decodeAudioData(r.result,function(e){i.buffer=e,i.panner.inputChannels(e.numberOfChannels),t&&t(i)})},r.onerror=function(t){onerror&&onerror(t)},r.readAsArrayBuffer(this.file)}},p5.SoundFile.prototype._updateProgress=function(t){if(t.lengthComputable){var e=t.loaded/t.total*.99;this._whileLoading(e,t)}else this._whileLoading("size unknown")},p5.SoundFile.prototype.isLoaded=function(){return this.buffer?!0:!1},p5.SoundFile.prototype.play=function(t,e,i,n,o){var s,a,u=this,p=r.audiocontext.currentTime,c=t||0;if(0>c&&(c=0),c+=p,this.rate(e),this.setVolume(i),!this.buffer)throw"not ready to play file, buffer has yet to load. Try preload()";if(this._pauseTime=0,"restart"===this.mode&&this.buffer&&this.bufferSourceNode&&(this.bufferSourceNode.stop(c),this._counterNode.stop(c)),"untildone"!==this.mode||!this.isPlaying()){if(this.bufferSourceNode=this._initSourceNode(),this._counterNode&&(this._counterNode=void 0),this._counterNode=this._initCounterNode(),n){if(!(n>=0&&n<this.buffer.duration))throw"start time out of range";s=n}else s=0;o=o?o<=this.buffer.duration-s?o:this.buffer.duration:this.buffer.duration-s,this.bufferSourceNode.connect(this.output),this._paused?(this.bufferSourceNode.start(c,this.pauseTime,o),this._counterNode.start(c,this.pauseTime,o)):(this.bufferSourceNode.start(c,s,o),this._counterNode.start(c,s,o)),this._playing=!0,this._paused=!1,this.bufferSourceNodes.push(this.bufferSourceNode),this.bufferSourceNode._arrayIndex=this.bufferSourceNodes.length-1;var h=function(){this._playing=!1,this.removeEventListener("ended",h,!1),u._onended(u),u.bufferSourceNodes.forEach(function(t,e){t._playing===!1&&u.bufferSourceNodes.splice(e)}),0===u.bufferSourceNodes.length&&(u._playing=!1)};this.bufferSourceNode.onended=h,this.bufferSourceNode.loop=this._looping,this._counterNode.loop=this._looping,this._looping===!0&&(a=s+o,this.bufferSourceNode.loopStart=s,this.bufferSourceNode.loopEnd=a,this._counterNode.loopStart=s,this._counterNode.loopEnd=a)}},p5.SoundFile.prototype.playMode=function(t){var e=t.toLowerCase();if("restart"===e&&this.buffer&&this.bufferSourceNode)for(var i=0;i<this.bufferSourceNodes.length-1;i++){var n=r.audiocontext.currentTime;this.bufferSourceNodes[i].stop(n)}if("restart"!==e&&"sustain"!==e&&"untildone"!==e)throw'Invalid play mode. Must be either "restart" or "sustain"';this.mode=e},p5.SoundFile.prototype.pause=function(t){var e=r.audiocontext.currentTime,i=t||0,n=i+e;this.isPlaying()&&this.buffer&&this.bufferSourceNode?(this.pauseTime=this.currentTime(),this.bufferSourceNode.stop(n),this._counterNode.stop(n),this._paused=!0,this._playing=!1,this._pauseTime=this.currentTime()):this._pauseTime=0},p5.SoundFile.prototype.loop=function(t,e,i,n,o){this._looping=!0,this.play(t,e,i,n,o)},p5.SoundFile.prototype.setLoop=function(t){if(t===!0)this._looping=!0;else{if(t!==!1)throw"Error: setLoop accepts either true or false";this._looping=!1}this.bufferSourceNode&&(this.bufferSourceNode.loop=this._looping,this._counterNode.loop=this._looping)},p5.SoundFile.prototype.isLooping=function(){return this.bufferSourceNode&&this._looping===!0&&this.isPlaying()===!0?!0:!1},p5.SoundFile.prototype.isPlaying=function(){return this._playing},p5.SoundFile.prototype.isPaused=function(){return this._paused},p5.SoundFile.prototype.stop=function(t){var e=t||0;if("sustain"===this.mode||"untildone"===this.mode)this.stopAll(e),this._playing=!1,this.pauseTime=0,this._paused=!1;else if(this.buffer&&this.bufferSourceNode){var i=r.audiocontext.currentTime,n=e||0;this.pauseTime=0,this.bufferSourceNode.stop(i+n),this._counterNode.stop(i+n),this._playing=!1,this._paused=!1}},p5.SoundFile.prototype.stopAll=function(t){var e=r.audiocontext.currentTime,i=t||0;if(this.buffer&&this.bufferSourceNode){for(var n=0;n<this.bufferSourceNodes.length;n++)if(void 0!==typeof this.bufferSourceNodes[n])try{this.bufferSourceNodes[n].onended=function(){},this.bufferSourceNodes[n].stop(e+i)}catch(o){}this._counterNode.stop(e+i),this._onended(this)}},p5.SoundFile.prototype.setVolume=function(t,e,i){if("number"==typeof t){var n=e||0,o=i||0,s=r.audiocontext.currentTime,a=this.output.gain.value;this.output.gain.cancelScheduledValues(s+o),this.output.gain.linearRampToValueAtTime(a,s+o),this.output.gain.linearRampToValueAtTime(t,s+o+n)}else{if(!t)return this.output.gain;t.connect(this.output.gain)}},p5.SoundFile.prototype.amp=p5.SoundFile.prototype.setVolume,p5.SoundFile.prototype.fade=p5.SoundFile.prototype.setVolume,p5.SoundFile.prototype.getVolume=function(){return this.output.gain.value},p5.SoundFile.prototype.pan=function(t,e){this.panPosition=t,this.panner.pan(t,e)},p5.SoundFile.prototype.getPan=function(){return this.panPosition},p5.SoundFile.prototype.rate=function(t){if("undefined"==typeof t)return this.playbackRate;if(0===t)t=1e-13;else if(0>t&&!this.reversed){var e=this.currentTime(),i=(e-this.duration())/t;this.pauseTime=i,this.reverseBuffer(),t=Math.abs(t)}else t>0&&this.reversed&&this.reverseBuffer();if(this.bufferSourceNode){var n=r.audiocontext.currentTime;this.bufferSourceNode.playbackRate.cancelScheduledValues(n),this.bufferSourceNode.playbackRate.linearRampToValueAtTime(Math.abs(t),n),this._counterNode.playbackRate.cancelScheduledValues(n),this._counterNode.playbackRate.linearRampToValueAtTime(Math.abs(t),n)}return this.playbackRate=t,this.playbackRate},p5.SoundFile.prototype.setPitch=function(t){var e=u(t)/u(60);this.rate(e)},p5.SoundFile.prototype.getPlaybackRate=function(){return this.playbackRate},p5.SoundFile.prototype.duration=function(){return this.buffer?this.buffer.duration:0},p5.SoundFile.prototype.currentTime=function(){return this._pauseTime>0?this._pauseTime:this._lastPos/a.sampleRate},p5.SoundFile.prototype.jump=function(t,e){if(0>t||t>this.buffer.duration)throw"jump time out of range";if(e>this.buffer.duration-t)throw"end time out of range";var i=t||0,n=e||this.buffer.duration-t;this.isPlaying()&&this.stop(),this.play(0,this.playbackRate,this.output.gain.value,i,n)},p5.SoundFile.prototype.channels=function(){return this.buffer.numberOfChannels},p5.SoundFile.prototype.sampleRate=function(){return this.buffer.sampleRate},p5.SoundFile.prototype.frames=function(){return this.buffer.length},p5.SoundFile.prototype.getPeaks=function(t){if(!this.buffer)throw"Cannot load peaks yet, buffer is not loaded";if(t||(t=5*window.width),this.buffer){for(var e=this.buffer,i=e.length/t,n=~~(i/10)||1,o=e.numberOfChannels,s=new Float32Array(Math.round(t)),r=0;o>r;r++)for(var a=e.getChannelData(r),u=0;t>u;u++){for(var p=~~(u*i),c=~~(p+i),h=0,l=p;c>l;l+=n){var d=a[l];d>h?h=d:-d>h&&(h=d)}(0===r||Math.abs(h)>s[u])&&(s[u]=h)}return s}},p5.SoundFile.prototype.reverseBuffer=function(){var t=this.getVolume();if(this.setVolume(0,.01,0),!this.buffer)throw"SoundFile is not done loading";for(var e=0;e<this.buffer.numberOfChannels;e++)Array.prototype.reverse.call(this.buffer.getChannelData(e));this.reversed=!this.reversed,this.setVolume(t,.01,.0101)},p5.SoundFile.prototype.onended=function(t){return this._onended=t,this},p5.SoundFile.prototype.add=function(){},p5.SoundFile.prototype.dispose=function(){var t=r.audiocontext.currentTime,e=r.soundArray.indexOf(this);if(r.soundArray.splice(e,1),this.stop(t),this.buffer&&this.bufferSourceNode){for(var i=0;i<this.bufferSourceNodes.length-1;i++)if(null!==this.bufferSourceNodes[i]){this.bufferSourceNodes[i].disconnect();try{this.bufferSourceNodes[i].stop(t)}catch(n){console.warning("no buffer source node to dispose")}this.bufferSourceNodes[i]=null}if(this.isPlaying()){try{this._counterNode.stop(t)}catch(n){console.log(n)}this._counterNode=null}}this.output&&(this.output.disconnect(),this.output=null),this.panner&&(this.panner.disconnect(),this.panner=null)},p5.SoundFile.prototype.connect=function(t){t?t.hasOwnProperty("input")?this.panner.connect(t.input):this.panner.connect(t):this.panner.connect(r.input)},p5.SoundFile.prototype.disconnect=function(){this.panner.disconnect()},p5.SoundFile.prototype.getLevel=function(){console.warn("p5.SoundFile.getLevel has been removed from the library. Use p5.Amplitude instead")},p5.SoundFile.prototype.setPath=function(t,e){var i=p5.prototype._checkFileFormats(t);this.url=i,this.load(e)},p5.SoundFile.prototype.setBuffer=function(t){var e=t.length,i=t[0].length,n=a.createBuffer(e,i,a.sampleRate);t[0]instanceof Float32Array||(t[0]=new Float32Array(t[0]));for(var o=0;e>o;o++){var s=n.getChannelData(o);s.set(t[o])}this.buffer=n,this.panner.inputChannels(e)};var p=function(t){for(var e=new Float32Array(t.length),i=a.createBuffer(1,t.length,44100),n=0;n<t.length;n++)e[n]=n;return i.getChannelData(0).set(e),i};p5.SoundFile.prototype._initCounterNode=function(){var t=this,e=a.currentTime,i=a.createBufferSource();return t._scopeNode&&(t._scopeNode.disconnect(),t._scopeNode.onaudioprocess=void 0,t._scopeNode=null),t._scopeNode=a.createScriptProcessor(256,1,1),i.buffer=p(t.buffer),i.playbackRate.setValueAtTime(t.playbackRate,e),i.connect(t._scopeNode),t._scopeNode.connect(p5.soundOut._silentNode),t._scopeNode.onaudioprocess=function(e){var i=e.inputBuffer.getChannelData(0);t._lastPos=i[i.length-1]||0,t._onTimeUpdate(t._lastPos)},i},p5.SoundFile.prototype._initSourceNode=function(){var t=a.createBufferSource();return t.buffer=this.buffer,t.playbackRate.value=this.playbackRate,t},p5.SoundFile.prototype.processPeaks=function(o,s,r,a){var u=this.buffer.length,p=this.buffer.sampleRate,c=this.buffer,h=[],l=s||.9,d=l,f=r||.22,m=a||200,y=new window.OfflineAudioContext(1,u,p),_=y.createBufferSource();_.buffer=c;var g=y.createBiquadFilter();g.type="lowpass",_.connect(g),g.connect(y.destination),_.start(0),y.startRendering(),y.oncomplete=function(s){var r=s.renderedBuffer,a=r.getChannelData(0);do h=t(a,d),d-=.005;while(Object.keys(h).length<m&&d>=f);var u=e(h),p=i(u,r.sampleRate),c=p.sort(function(t,e){return e.count-t.count}).splice(0,5);this.tempo=c[0].tempo;var l=5,y=n(h,c[0].tempo,r.sampleRate,l);o(y)}};var c=function(t,e){this.sampleIndex=e,this.amplitude=t,this.tempos=[],this.intervals=[]},h=function(t,e,i,n){this.callback=t,this.time=e,this.id=i,this.val=n};p5.SoundFile.prototype.addCue=function(t,e,i){var n=this._cueIDCounter++,o=new h(e,t,n,i);return this._cues.push(o),n},p5.SoundFile.prototype.removeCue=function(t){for(var e=this._cues.length,i=0;e>i;i++){var n=this._cues[i];n.id===t&&this.cues.splice(i,1)}0===this._cues.length},p5.SoundFile.prototype.clearCues=function(){this._cues=[]},p5.SoundFile.prototype._onTimeUpdate=function(t){for(var e=t/this.buffer.sampleRate,i=this._cues.length,n=0;i>n;n++){var o=this._cues[n],s=o.time,r=o.val;this._prevTime<s&&e>=s&&o.callback(r)}this._prevTime=e}}(sndcore,errorHandler,master,helpers);var amplitude;amplitude=function(){var t=master;p5.Amplitude=function(e){this.bufferSize=2048,this.audiocontext=t.audiocontext,this.processor=this.audiocontext.createScriptProcessor(this.bufferSize,2,1),this.input=this.processor,this.output=this.audiocontext.createGain(),this.smoothing=e||0,this.volume=0,this.average=0,this.stereoVol=[0,0],this.stereoAvg=[0,0],this.stereoVolNorm=[0,0],this.volMax=.001,this.normalize=!1,this.processor.onaudioprocess=this._audioProcess.bind(this),this.processor.connect(this.output),this.output.gain.value=0,this.output.connect(this.audiocontext.destination),t.meter.connect(this.processor),t.soundArray.push(this)},p5.Amplitude.prototype.setInput=function(e,i){t.meter.disconnect(),i&&(this.smoothing=i),null==e?(console.log("Amplitude input source is not ready! Connecting to master output instead"),t.meter.connect(this.processor)):e instanceof p5.Signal?e.output.connect(this.processor):e?(e.connect(this.processor),this.processor.disconnect(),this.processor.connect(this.output)):t.meter.connect(this.processor)},p5.Amplitude.prototype.connect=function(e){e?e.hasOwnProperty("input")?this.output.connect(e.input):this.output.connect(e):this.output.connect(this.panner.connect(t.input))},p5.Amplitude.prototype.disconnect=function(){this.output.disconnect()},p5.Amplitude.prototype._audioProcess=function(t){for(var e=0;e<t.inputBuffer.numberOfChannels;e++){for(var i,n=t.inputBuffer.getChannelData(e),o=n.length,s=0,r=0,a=0;o>a;a++)i=n[a],this.normalize?(s+=Math.max(Math.min(i/this.volMax,1),-1),r+=Math.max(Math.min(i/this.volMax,1),-1)*Math.max(Math.min(i/this.volMax,1),-1)):(s+=i,r+=i*i);var u=s/o,p=Math.sqrt(r/o);this.stereoVol[e]=Math.max(p,this.stereoVol[e]*this.smoothing),this.stereoAvg[e]=Math.max(u,this.stereoVol[e]*this.smoothing),this.volMax=Math.max(this.stereoVol[e],this.volMax)}var c=this,h=this.stereoVol.reduce(function(t,e,i){return c.stereoVolNorm[i-1]=Math.max(Math.min(c.stereoVol[i-1]/c.volMax,1),0),c.stereoVolNorm[i]=Math.max(Math.min(c.stereoVol[i]/c.volMax,1),0),t+e});this.volume=h/this.stereoVol.length,this.volNorm=Math.max(Math.min(this.volume/this.volMax,1),0)},p5.Amplitude.prototype.getLevel=function(t){return"undefined"!=typeof t?this.normalize?this.stereoVolNorm[t]:this.stereoVol[t]:this.normalize?this.volNorm:this.volume},p5.Amplitude.prototype.toggleNormalize=function(t){"boolean"==typeof t?this.normalize=t:this.normalize=!this.normalize},p5.Amplitude.prototype.smooth=function(t){t>=0&&1>t?this.smoothing=t:console.log("Error: smoothing must be between 0 and 1")},p5.Amplitude.prototype.dispose=function(){var e=t.soundArray.indexOf(this);t.soundArray.splice(e,1),this.input.disconnect(),this.output.disconnect(),this.input=this.processor=void 0,this.output=void 0}}(master);var fft;fft=function(){var t=master;p5.FFT=function(e,i){this.input=this.analyser=t.audiocontext.createAnalyser(),Object.defineProperties(this,{bins:{get:function(){return this.analyser.fftSize/2},set:function(t){this.analyser.fftSize=2*t},configurable:!0,enumerable:!0},smoothing:{get:function(){return this.analyser.smoothingTimeConstant},set:function(t){this.analyser.smoothingTimeConstant=t},configurable:!0,enumerable:!0}}),this.smooth(e),this.bins=i||1024,t.fftMeter.connect(this.analyser),this.freqDomain=new Uint8Array(this.analyser.frequencyBinCount),this.timeDomain=new Uint8Array(this.analyser.frequencyBinCount),this.bass=[20,140],this.lowMid=[140,400],this.mid=[400,2600],this.highMid=[2600,5200],this.treble=[5200,14e3],t.soundArray.push(this)},p5.FFT.prototype.setInput=function(e){e?(e.output?e.output.connect(this.analyser):e.connect&&e.connect(this.analyser),t.fftMeter.disconnect()):t.fftMeter.connect(this.analyser)},p5.FFT.prototype.waveform=function(){for(var t,e,i,s=0;s<arguments.length;s++)"number"==typeof arguments[s]&&(t=arguments[s],this.analyser.fftSize=2*t),"string"==typeof arguments[s]&&(e=arguments[s]);if(e&&!p5.prototype._isSafari())return n(this,this.timeDomain),this.analyser.getFloatTimeDomainData(this.timeDomain),this.timeDomain;o(this,this.timeDomain),this.analyser.getByteTimeDomainData(this.timeDomain);for(var i=new Array,r=0;r<this.timeDomain.length;r++){var a=p5.prototype.map(this.timeDomain[r],0,255,-1,1);i.push(a)}return i},p5.FFT.prototype.analyze=function(){for(var t,n=0;n<arguments.length;n++)"number"==typeof arguments[n]&&(this.bins=arguments[n],this.analyser.fftSize=2*this.bins),"string"==typeof arguments[n]&&(t=arguments[n]);if(t&&"db"===t.toLowerCase())return e(this),this.analyser.getFloatFrequencyData(this.freqDomain),this.freqDomain;i(this,this.freqDomain),this.analyser.getByteFrequencyData(this.freqDomain);var o=Array.apply([],this.freqDomain);return o.length===this.analyser.fftSize,o.constructor===Array,o},p5.FFT.prototype.getEnergy=function(e,i){var n=t.audiocontext.sampleRate/2;if("bass"===e?(e=this.bass[0],i=this.bass[1]):"lowMid"===e?(e=this.lowMid[0],i=this.lowMid[1]):"mid"===e?(e=this.mid[0],i=this.mid[1]):"highMid"===e?(e=this.highMid[0],i=this.highMid[1]):"treble"===e&&(e=this.treble[0],i=this.treble[1]),"number"!=typeof e)throw"invalid input for getEnergy()";if(i){if(e&&i){if(e>i){var o=i;i=e,e=o}for(var s=Math.round(e/n*this.freqDomain.length),r=Math.round(i/n*this.freqDomain.length),a=0,u=0,p=s;r>=p;p++)a+=this.freqDomain[p],u+=1;var c=a/u;return c}throw"invalid input for getEnergy()"}var h=Math.round(e/n*this.freqDomain.length);return this.freqDomain[h]},p5.FFT.prototype.getFreq=function(t,e){console.log("getFreq() is deprecated. Please use getEnergy() instead.");var i=this.getEnergy(t,e);return i},p5.FFT.prototype.getCentroid=function(){for(var e=t.audiocontext.sampleRate/2,i=0,n=0,o=0;o<this.freqDomain.length;o++)i+=o*this.freqDomain[o],n+=this.freqDomain[o];var s=0;0!==n&&(s=i/n);var r=s*(e/this.freqDomain.length);return r},p5.FFT.prototype.smooth=function(t){return"undefined"!=typeof t&&(this.smoothing=t),this.smoothing},p5.FFT.prototype.dispose=function(){var e=t.soundArray.indexOf(this);t.soundArray.splice(e,1),this.analyser.disconnect(),this.analyser=void 0},p5.FFT.prototype.linAverages=function(t){for(var t=t||16,e=this.freqDomain,i=e.length,n=Math.floor(i/t),o=new Array(t),s=0,r=0;i>r;r++)o[s]=void 0!==o[s]?(o[s]+e[r])/2:e[r],r%n===n-1&&s++;return o},p5.FFT.prototype.logAverages=function(e){for(var i=t.audiocontext.sampleRate/2,n=this.freqDomain,o=n.length,s=new Array(e.length),r=0,a=0;o>a;a++){var u=Math.round(a*i/this.freqDomain.length);u>e[r].hi&&r++,s[r]=void 0!==s[r]?(s[r]+n[a])/2:n[a]}return s},p5.FFT.prototype.getOctaveBands=function(e,i){var e=e||3,i=i||15.625,n=[],o={lo:i/Math.pow(2,1/(2*e)),ctr:i,hi:i*Math.pow(2,1/(2*e))};n.push(o);for(var s=t.audiocontext.sampleRate/2;o.hi<s;){var r={};r.lo=o.hi,r.ctr=o.ctr*Math.pow(2,1/e),r.hi=r.ctr*Math.pow(2,1/(2*e)),n.push(r),o=r}return n};var e=function(t){t.freqDomain instanceof Float32Array==!1&&(t.freqDomain=new Float32Array(t.analyser.frequencyBinCount))},i=function(t){t.freqDomain instanceof Uint8Array==!1&&(t.freqDomain=new Uint8Array(t.analyser.frequencyBinCount))},n=function(t){t.timeDomain instanceof Float32Array==!1&&(t.timeDomain=new Float32Array(t.analyser.frequencyBinCount))},o=function(t){t.timeDomain instanceof Uint8Array==!1&&(t.timeDomain=new Uint8Array(t.analyser.frequencyBinCount))}}(master);var Tone_core_Tone;Tone_core_Tone=function(){"use strict";function t(t){return void 0===t}function e(t){return"function"==typeof t}var i;if(t(window.AudioContext)&&(window.AudioContext=window.webkitAudioContext),t(window.OfflineAudioContext)&&(window.OfflineAudioContext=window.webkitOfflineAudioContext),t(AudioContext))throw new Error("Web Audio is not supported in this browser");i=new AudioContext,e(AudioContext.prototype.createGain)||(AudioContext.prototype.createGain=AudioContext.prototype.createGainNode),e(AudioContext.prototype.createDelay)||(AudioContext.prototype.createDelay=AudioContext.prototype.createDelayNode),e(AudioContext.prototype.createPeriodicWave)||(AudioContext.prototype.createPeriodicWave=AudioContext.prototype.createWaveTable),e(AudioBufferSourceNode.prototype.start)||(AudioBufferSourceNode.prototype.start=AudioBufferSourceNode.prototype.noteGrainOn),e(AudioBufferSourceNode.prototype.stop)||(AudioBufferSourceNode.prototype.stop=AudioBufferSourceNode.prototype.noteOff),
e(OscillatorNode.prototype.start)||(OscillatorNode.prototype.start=OscillatorNode.prototype.noteOn),e(OscillatorNode.prototype.stop)||(OscillatorNode.prototype.stop=OscillatorNode.prototype.noteOff),e(OscillatorNode.prototype.setPeriodicWave)||(OscillatorNode.prototype.setPeriodicWave=OscillatorNode.prototype.setWaveTable),AudioNode.prototype._nativeConnect=AudioNode.prototype.connect,AudioNode.prototype.connect=function(e,i,n){if(e.input)Array.isArray(e.input)?(t(n)&&(n=0),this.connect(e.input[n])):this.connect(e.input,i,n);else try{e instanceof AudioNode?this._nativeConnect(e,i,n):this._nativeConnect(e,i)}catch(o){throw new Error("error connecting to node: "+e)}};var n=function(e,i){t(e)||1===e?this.input=this.context.createGain():e>1&&(this.input=new Array(e)),t(i)||1===i?this.output=this.context.createGain():i>1&&(this.output=new Array(e))};n.prototype.set=function(e,i,o){if(this.isObject(e))o=i;else if(this.isString(e)){var s={};s[e]=i,e=s}for(var r in e){i=e[r];var a=this;if(-1!==r.indexOf(".")){for(var u=r.split("."),p=0;p<u.length-1;p++)a=a[u[p]];r=u[u.length-1]}var c=a[r];t(c)||(n.Signal&&c instanceof n.Signal||n.Param&&c instanceof n.Param?c.value!==i&&(t(o)?c.value=i:c.rampTo(i,o)):c instanceof AudioParam?c.value!==i&&(c.value=i):c instanceof n?c.set(i):c!==i&&(a[r]=i))}return this},n.prototype.get=function(i){t(i)?i=this._collectDefaults(this.constructor):this.isString(i)&&(i=[i]);for(var o={},s=0;s<i.length;s++){var r=i[s],a=this,u=o;if(-1!==r.indexOf(".")){for(var p=r.split("."),c=0;c<p.length-1;c++){var h=p[c];u[h]=u[h]||{},u=u[h],a=a[h]}r=p[p.length-1]}var l=a[r];this.isObject(i[r])?u[r]=l.get():n.Signal&&l instanceof n.Signal?u[r]=l.value:n.Param&&l instanceof n.Param?u[r]=l.value:l instanceof AudioParam?u[r]=l.value:l instanceof n?u[r]=l.get():e(l)||t(l)||(u[r]=l)}return o},n.prototype._collectDefaults=function(e){var i=[];if(t(e.defaults)||(i=Object.keys(e.defaults)),!t(e._super))for(var n=this._collectDefaults(e._super),o=0;o<n.length;o++)-1===i.indexOf(n[o])&&i.push(n[o]);return i},n.prototype.toString=function(){for(var t in n){var i=t[0].match(/^[A-Z]$/),o=n[t]===this.constructor;if(e(n[t])&&i&&o)return t}return"Tone"},n.context=i,n.prototype.context=n.context,n.prototype.bufferSize=2048,n.prototype.blockTime=128/n.context.sampleRate,n.prototype.dispose=function(){return this.isUndef(this.input)||(this.input instanceof AudioNode&&this.input.disconnect(),this.input=null),this.isUndef(this.output)||(this.output instanceof AudioNode&&this.output.disconnect(),this.output=null),this};var o=null;n.prototype.noGC=function(){return this.output.connect(o),this},AudioNode.prototype.noGC=function(){return this.connect(o),this},n.prototype.connect=function(t,e,i){return Array.isArray(this.output)?(e=this.defaultArg(e,0),this.output[e].connect(t,0,i)):this.output.connect(t,e,i),this},n.prototype.disconnect=function(t){return Array.isArray(this.output)?(t=this.defaultArg(t,0),this.output[t].disconnect()):this.output.disconnect(),this},n.prototype.connectSeries=function(){if(arguments.length>1)for(var t=arguments[0],e=1;e<arguments.length;e++){var i=arguments[e];t.connect(i),t=i}return this},n.prototype.connectParallel=function(){var t=arguments[0];if(arguments.length>1)for(var e=1;e<arguments.length;e++){var i=arguments[e];t.connect(i)}return this},n.prototype.chain=function(){if(arguments.length>0)for(var t=this,e=0;e<arguments.length;e++){var i=arguments[e];t.connect(i),t=i}return this},n.prototype.fan=function(){if(arguments.length>0)for(var t=0;t<arguments.length;t++)this.connect(arguments[t]);return this},AudioNode.prototype.chain=n.prototype.chain,AudioNode.prototype.fan=n.prototype.fan,n.prototype.defaultArg=function(e,i){if(this.isObject(e)&&this.isObject(i)){var n={};for(var o in e)n[o]=this.defaultArg(i[o],e[o]);for(var s in i)n[s]=this.defaultArg(e[s],i[s]);return n}return t(e)?i:e},n.prototype.optionsObject=function(t,e,i){var n={};if(1===t.length&&this.isObject(t[0]))n=t[0];else for(var o=0;o<e.length;o++)n[e[o]]=t[o];return this.isUndef(i)?n:this.defaultArg(n,i)},n.prototype.isUndef=t,n.prototype.isFunction=e,n.prototype.isNumber=function(t){return"number"==typeof t},n.prototype.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)&&t.constructor===Object},n.prototype.isBoolean=function(t){return"boolean"==typeof t},n.prototype.isArray=function(t){return Array.isArray(t)},n.prototype.isString=function(t){return"string"==typeof t},n.noOp=function(){},n.prototype._readOnly=function(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)this._readOnly(t[e]);else Object.defineProperty(this,t,{writable:!1,enumerable:!0})},n.prototype._writable=function(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)this._writable(t[e]);else Object.defineProperty(this,t,{writable:!0})},n.State={Started:"started",Stopped:"stopped",Paused:"paused"},n.prototype.equalPowerScale=function(t){var e=.5*Math.PI;return Math.sin(t*e)},n.prototype.dbToGain=function(t){return Math.pow(2,t/6)},n.prototype.gainToDb=function(t){return 20*(Math.log(t)/Math.LN10)},n.prototype.now=function(){return this.context.currentTime},n.extend=function(e,i){function o(){}t(i)&&(i=n),o.prototype=i.prototype,e.prototype=new o,e.prototype.constructor=e,e._super=i};var s=[];return n._initAudioContext=function(t){t(n.context),s.push(t)},n.setContext=function(t){n.prototype.context=t,n.context=t;for(var e=0;e<s.length;e++)s[e](t)},n.startMobile=function(){var t=n.context.createOscillator(),e=n.context.createGain();e.gain.value=0,t.connect(e),e.connect(n.context.destination);var i=n.context.currentTime;t.start(i),t.stop(i+1)},n._initAudioContext(function(t){n.prototype.blockTime=128/t.sampleRate,o=t.createGain(),o.gain.value=0,o.connect(t.destination)}),n.version="r7-dev",n}();var Tone_signal_SignalBase;Tone_signal_SignalBase=function(t){"use strict";return t.SignalBase=function(){},t.extend(t.SignalBase),t.SignalBase.prototype.connect=function(e,i,n){return t.Signal&&t.Signal===e.constructor||t.Param&&t.Param===e.constructor||t.TimelineSignal&&t.TimelineSignal===e.constructor?(e._param.cancelScheduledValues(0),e._param.value=0,e.overridden=!0):e instanceof AudioParam&&(e.cancelScheduledValues(0),e.value=0),t.prototype.connect.call(this,e,i,n),this},t.SignalBase}(Tone_core_Tone);var Tone_signal_WaveShaper;Tone_signal_WaveShaper=function(t){"use strict";return t.WaveShaper=function(t,e){this._shaper=this.input=this.output=this.context.createWaveShaper(),this._curve=null,Array.isArray(t)?this.curve=t:isFinite(t)||this.isUndef(t)?this._curve=new Float32Array(this.defaultArg(t,1024)):this.isFunction(t)&&(this._curve=new Float32Array(this.defaultArg(e,1024)),this.setMap(t))},t.extend(t.WaveShaper,t.SignalBase),t.WaveShaper.prototype.setMap=function(t){for(var e=0,i=this._curve.length;i>e;e++){var n=e/i*2-1;this._curve[e]=t(n,e)}return this._shaper.curve=this._curve,this},Object.defineProperty(t.WaveShaper.prototype,"curve",{get:function(){return this._shaper.curve},set:function(t){this._curve=new Float32Array(t),this._shaper.curve=this._curve}}),Object.defineProperty(t.WaveShaper.prototype,"oversample",{get:function(){return this._shaper.oversample},set:function(t){if(-1===["none","2x","4x"].indexOf(t))throw new Error("invalid oversampling: "+t);this._shaper.oversample=t}}),t.WaveShaper.prototype.dispose=function(){return t.prototype.dispose.call(this),this._shaper.disconnect(),this._shaper=null,this._curve=null,this},t.WaveShaper}(Tone_core_Tone);var Tone_core_Type;Tone_core_Type=function(Tone){"use strict";function getTransportBpm(){return Tone.Transport&&Tone.Transport.bpm?Tone.Transport.bpm.value:120}function getTransportTimeSignature(){return Tone.Transport&&Tone.Transport.timeSignature?Tone.Transport.timeSignature:4}function toNotationHelper(t,e,i,n){for(var o=this.toSeconds(t),s=this.notationToSeconds(n[n.length-1],e,i),r="",a=0;a<n.length;a++){var u=this.notationToSeconds(n[a],e,i),p=o/u,c=1e-6;if(c>1-p%1&&(p+=c),p=Math.floor(p),p>0){if(r+=1===p?n[a]:p.toString()+"*"+n[a],o-=p*u,s>o)break;r+=" + "}}return""===r&&(r="0"),r}Tone.Type={Default:"number",Time:"time",Frequency:"frequency",NormalRange:"normalRange",AudioRange:"audioRange",Decibels:"db",Interval:"interval",BPM:"bpm",Positive:"positive",Cents:"cents",Degrees:"degrees",MIDI:"midi",TransportTime:"transportTime",Ticks:"tick",Note:"note",Milliseconds:"milliseconds",Notation:"notation"},Tone.prototype.isNowRelative=function(){var t=new RegExp(/^\s*\+(.)+/i);return function(e){return t.test(e)}}(),Tone.prototype.isTicks=function(){var t=new RegExp(/^\d+i$/i);return function(e){return t.test(e)}}(),Tone.prototype.isNotation=function(){var t=new RegExp(/^[0-9]+[mnt]$/i);return function(e){return t.test(e)}}(),Tone.prototype.isTransportTime=function(){var t=new RegExp(/^(\d+(\.\d+)?\:){1,2}(\d+(\.\d+)?)?$/i);return function(e){return t.test(e)}}(),Tone.prototype.isNote=function(){var t=new RegExp(/^[a-g]{1}(b|#|x|bb)?-?[0-9]+$/i);return function(e){return t.test(e)}}(),Tone.prototype.isFrequency=function(){var t=new RegExp(/^\d*\.?\d+hz$/i);return function(e){return t.test(e)}}(),Tone.prototype.notationToSeconds=function(t,e,i){e=this.defaultArg(e,getTransportBpm()),i=this.defaultArg(i,getTransportTimeSignature());var n=60/e;"1n"===t&&(t="1m");var o=parseInt(t,10),s=0;0===o&&(s=0);var r=t.slice(-1);return s="t"===r?4/o*2/3:"n"===r?4/o:"m"===r?o*i:0,n*s},Tone.prototype.transportTimeToSeconds=function(t,e,i){e=this.defaultArg(e,getTransportBpm()),i=this.defaultArg(i,getTransportTimeSignature());var n=0,o=0,s=0,r=t.split(":");2===r.length?(n=parseFloat(r[0]),o=parseFloat(r[1])):1===r.length?o=parseFloat(r[0]):3===r.length&&(n=parseFloat(r[0]),o=parseFloat(r[1]),s=parseFloat(r[2]));var a=n*i+o+s/4;return a*(60/e)},Tone.prototype.ticksToSeconds=function(t,e){if(this.isUndef(Tone.Transport))return 0;t=parseFloat(t),e=this.defaultArg(e,getTransportBpm());var i=60/e/Tone.Transport.PPQ;return i*t},Tone.prototype.frequencyToSeconds=function(t){return 1/parseFloat(t)},Tone.prototype.samplesToSeconds=function(t){return t/this.context.sampleRate},Tone.prototype.secondsToSamples=function(t){return t*this.context.sampleRate},Tone.prototype.secondsToTransportTime=function(t,e,i){e=this.defaultArg(e,getTransportBpm()),i=this.defaultArg(i,getTransportTimeSignature());var n=60/e,o=t/n,s=Math.floor(o/i),r=o%1*4;o=Math.floor(o)%i;var a=[s,o,r];return a.join(":")},Tone.prototype.secondsToFrequency=function(t){return 1/t},Tone.prototype.toTransportTime=function(t,e,i){var n=this.toSeconds(t);return this.secondsToTransportTime(n,e,i)},Tone.prototype.toFrequency=function(t,e){return this.isFrequency(t)?parseFloat(t):this.isNotation(t)||this.isTransportTime(t)?this.secondsToFrequency(this.toSeconds(t,e)):this.isNote(t)?this.noteToFrequency(t):t},Tone.prototype.toTicks=function(t){if(this.isUndef(Tone.Transport))return 0;var e=Tone.Transport.bpm.value,i=0;if(this.isNowRelative(t))t=t.replace("+",""),i=Tone.Transport.ticks;else if(this.isUndef(t))return Tone.Transport.ticks;var n=this.toSeconds(t),o=60/e,s=n/o,r=s*Tone.Transport.PPQ;return Math.round(r+i)},Tone.prototype.toSamples=function(t){var e=this.toSeconds(t);return Math.round(e*this.context.sampleRate)},Tone.prototype.toSeconds=function(time,now){if(now=this.defaultArg(now,this.now()),this.isNumber(time))return time;if(this.isString(time)){var plusTime=0;this.isNowRelative(time)&&(time=time.replace("+",""),plusTime=now);var betweenParens=time.match(/\(([^)(]+)\)/g);if(betweenParens)for(var j=0;j<betweenParens.length;j++){var symbol=betweenParens[j].replace(/[\(\)]/g,""),symbolVal=this.toSeconds(symbol);time=time.replace(betweenParens[j],symbolVal)}if(-1!==time.indexOf("@")){var quantizationSplit=time.split("@");if(this.isUndef(Tone.Transport))throw new Error("quantization requires Tone.Transport");var toQuantize=quantizationSplit[0].trim();""===toQuantize&&(toQuantize=void 0),plusTime>0&&(toQuantize="+"+toQuantize,plusTime=0);var subdivision=quantizationSplit[1].trim();time=Tone.Transport.quantize(toQuantize,subdivision)}else{var components=time.split(/[\(\)\-\+\/\*]/);if(components.length>1){for(var originalTime=time,i=0;i<components.length;i++){var symb=components[i].trim();if(""!==symb){var val=this.toSeconds(symb);time=time.replace(symb,val)}}try{time=eval(time)}catch(e){throw new EvalError("cannot evaluate Time: "+originalTime)}}else time=this.isNotation(time)?this.notationToSeconds(time):this.isTransportTime(time)?this.transportTimeToSeconds(time):this.isFrequency(time)?this.frequencyToSeconds(time):this.isTicks(time)?this.ticksToSeconds(time):parseFloat(time)}return time+plusTime}return now},Tone.prototype.toNotation=function(t,e,i){var n=["1m","2n","4n","8n","16n","32n","64n","128n"],o=toNotationHelper.call(this,t,e,i,n),s=["1m","2n","2t","4n","4t","8n","8t","16n","16t","32n","32t","64n","64t","128n"],r=toNotationHelper.call(this,t,e,i,s);return r.split("+").length<o.split("+").length?r:o},Tone.prototype.fromUnits=function(t,e){if(!this.convert&&!this.isUndef(this.convert))return t;switch(e){case Tone.Type.Time:return this.toSeconds(t);case Tone.Type.Frequency:return this.toFrequency(t);case Tone.Type.Decibels:return this.dbToGain(t);case Tone.Type.NormalRange:return Math.min(Math.max(t,0),1);case Tone.Type.AudioRange:return Math.min(Math.max(t,-1),1);case Tone.Type.Positive:return Math.max(t,0);default:return t}},Tone.prototype.toUnits=function(t,e){if(!this.convert&&!this.isUndef(this.convert))return t;switch(e){case Tone.Type.Decibels:return this.gainToDb(t);default:return t}};var noteToScaleIndex={cbb:-2,cb:-1,c:0,"c#":1,cx:2,dbb:0,db:1,d:2,"d#":3,dx:4,ebb:2,eb:3,e:4,"e#":5,ex:6,fbb:3,fb:4,f:5,"f#":6,fx:7,gbb:5,gb:6,g:7,"g#":8,gx:9,abb:7,ab:8,a:9,"a#":10,ax:11,bbb:9,bb:10,b:11,"b#":12,bx:13},scaleIndexToNote=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];return Tone.A4=440,Tone.prototype.noteToFrequency=function(t){var e=t.split(/(-?\d+)/);if(3===e.length){var i=noteToScaleIndex[e[0].toLowerCase()],n=e[1],o=i+12*(parseInt(n,10)+1);return this.midiToFrequency(o)}return 0},Tone.prototype.frequencyToNote=function(t){var e=Math.log(t/Tone.A4)/Math.LN2,i=Math.round(12*e)+57,n=Math.floor(i/12);0>n&&(i+=-12*n);var o=scaleIndexToNote[i%12];return o+n.toString()},Tone.prototype.intervalToFrequencyRatio=function(t){return Math.pow(2,t/12)},Tone.prototype.midiToNote=function(t){var e=Math.floor(t/12)-1,i=t%12;return scaleIndexToNote[i]+e},Tone.prototype.noteToMidi=function(t){var e=t.split(/(\d+)/);if(3===e.length){var i=noteToScaleIndex[e[0].toLowerCase()],n=e[1];return i+12*(parseInt(n,10)+1)}return 0},Tone.prototype.midiToFrequency=function(t){return Tone.A4*Math.pow(2,(t-69)/12)},Tone}(Tone_core_Tone);var Tone_core_Param;Tone_core_Param=function(t){"use strict";return t.Param=function(){var e=this.optionsObject(arguments,["param","units","convert"],t.Param.defaults);this._param=this.input=e.param,this.units=e.units,this.convert=e.convert,this.overridden=!1,this.isUndef(e.value)||(this.value=e.value)},t.extend(t.Param),t.Param.defaults={units:t.Type.Default,convert:!0,param:void 0},Object.defineProperty(t.Param.prototype,"value",{get:function(){return this._toUnits(this._param.value)},set:function(t){var e=this._fromUnits(t);this._param.value=e}}),t.Param.prototype._fromUnits=function(e){if(!this.convert&&!this.isUndef(this.convert))return e;switch(this.units){case t.Type.Time:return this.toSeconds(e);case t.Type.Frequency:return this.toFrequency(e);case t.Type.Decibels:return this.dbToGain(e);case t.Type.NormalRange:return Math.min(Math.max(e,0),1);case t.Type.AudioRange:return Math.min(Math.max(e,-1),1);case t.Type.Positive:return Math.max(e,0);default:return e}},t.Param.prototype._toUnits=function(e){if(!this.convert&&!this.isUndef(this.convert))return e;switch(this.units){case t.Type.Decibels:return this.gainToDb(e);default:return e}},t.Param.prototype._minOutput=1e-5,t.Param.prototype.setValueAtTime=function(t,e){return t=this._fromUnits(t),this._param.setValueAtTime(t,this.toSeconds(e)),this},t.Param.prototype.setRampPoint=function(t){t=this.defaultArg(t,this.now());var e=this._param.value;return this._param.setValueAtTime(e,t),this},t.Param.prototype.linearRampToValueAtTime=function(t,e){return t=this._fromUnits(t),this._param.linearRampToValueAtTime(t,this.toSeconds(e)),this},t.Param.prototype.exponentialRampToValueAtTime=function(t,e){return t=this._fromUnits(t),t=Math.max(this._minOutput,t),this._param.exponentialRampToValueAtTime(t,this.toSeconds(e)),this},t.Param.prototype.exponentialRampToValue=function(t,e){var i=this.now(),n=this.value;return this.setValueAtTime(Math.max(n,this._minOutput),i),this.exponentialRampToValueAtTime(t,i+this.toSeconds(e)),this},t.Param.prototype.linearRampToValue=function(t,e){var i=this.now();return this.setRampPoint(i),this.linearRampToValueAtTime(t,i+this.toSeconds(e)),this},t.Param.prototype.setTargetAtTime=function(t,e,i){return t=this._fromUnits(t),t=Math.max(this._minOutput,t),i=Math.max(this._minOutput,i),this._param.setTargetAtTime(t,this.toSeconds(e),i),this},t.Param.prototype.setValueCurveAtTime=function(t,e,i){for(var n=0;n<t.length;n++)t[n]=this._fromUnits(t[n]);return this._param.setValueCurveAtTime(t,this.toSeconds(e),this.toSeconds(i)),this},t.Param.prototype.cancelScheduledValues=function(t){return this._param.cancelScheduledValues(this.toSeconds(t)),this},t.Param.prototype.rampTo=function(e,i){return i=this.defaultArg(i,0),this.units===t.Type.Frequency||this.units===t.Type.BPM?this.exponentialRampToValue(e,i):this.linearRampToValue(e,i),this},t.Param.prototype.dispose=function(){return t.prototype.dispose.call(this),this._param=null,this},t.Param}(Tone_core_Tone);var Tone_core_Gain;Tone_core_Gain=function(t){"use strict";return t.Gain=function(){var e=this.optionsObject(arguments,["gain","units"],t.Gain.defaults);this.input=this.output=this._gainNode=this.context.createGain(),this.gain=new t.Param({param:this._gainNode.gain,units:e.units,value:e.gain,convert:e.convert}),this._readOnly("gain")},t.extend(t.Gain),t.Gain.defaults={gain:1,convert:!0},t.Gain.prototype.dispose=function(){t.Param.prototype.dispose.call(this),this._gainNode.disconnect(),this._gainNode=null,this._writable("gain"),this.gain.dispose(),this.gain=null},t.Gain}(Tone_core_Tone,Tone_core_Param);var Tone_signal_Signal;Tone_signal_Signal=function(t){"use strict";return t.Signal=function(){var e=this.optionsObject(arguments,["value","units"],t.Signal.defaults);this.output=this._gain=this.context.createGain(),e.param=this._gain.gain,t.Param.call(this,e),this.input=this._param=this._gain.gain,t.Signal._constant.chain(this._gain)},t.extend(t.Signal,t.Param),t.Signal.defaults={value:0,units:t.Type.Default,convert:!0},t.Signal.prototype.connect=t.SignalBase.prototype.connect,t.Signal.prototype.dispose=function(){return t.Param.prototype.dispose.call(this),this._param=null,this._gain.disconnect(),this._gain=null,this},t.Signal._constant=null,t._initAudioContext(function(e){for(var i=e.createBuffer(1,128,e.sampleRate),n=i.getChannelData(0),o=0;o<n.length;o++)n[o]=1;t.Signal._constant=e.createBufferSource(),t.Signal._constant.channelCount=1,t.Signal._constant.channelCountMode="explicit",t.Signal._constant.buffer=i,t.Signal._constant.loop=!0,t.Signal._constant.start(0),t.Signal._constant.noGC()}),t.Signal}(Tone_core_Tone,Tone_signal_WaveShaper,Tone_core_Type,Tone_core_Param);var Tone_signal_Add;Tone_signal_Add=function(t){"use strict";return t.Add=function(e){t.call(this,2,0),this._sum=this.input[0]=this.input[1]=this.output=this.context.createGain(),this._param=this.input[1]=new t.Signal(e),this._param.connect(this._sum)},t.extend(t.Add,t.Signal),t.Add.prototype.dispose=function(){return t.prototype.dispose.call(this),this._sum.disconnect(),this._sum=null,this._param.dispose(),this._param=null,this},t.Add}(Tone_core_Tone);var Tone_signal_Multiply;Tone_signal_Multiply=function(t){"use strict";return t.Multiply=function(e){t.call(this,2,0),this._mult=this.input[0]=this.output=this.context.createGain(),this._param=this.input[1]=this.output.gain,this._param.value=this.defaultArg(e,0)},t.extend(t.Multiply,t.Signal),t.Multiply.prototype.dispose=function(){return t.prototype.dispose.call(this),this._mult.disconnect(),this._mult=null,this._param=null,this},t.Multiply}(Tone_core_Tone);var Tone_signal_Scale;Tone_signal_Scale=function(t){"use strict";return t.Scale=function(e,i){this._outputMin=this.defaultArg(e,0),this._outputMax=this.defaultArg(i,1),this._scale=this.input=new t.Multiply(1),this._add=this.output=new t.Add(0),this._scale.connect(this._add),this._setRange()},t.extend(t.Scale,t.SignalBase),Object.defineProperty(t.Scale.prototype,"min",{get:function(){return this._outputMin},set:function(t){this._outputMin=t,this._setRange()}}),Object.defineProperty(t.Scale.prototype,"max",{get:function(){return this._outputMax},set:function(t){this._outputMax=t,this._setRange()}}),t.Scale.prototype._setRange=function(){this._add.value=this._outputMin,this._scale.value=this._outputMax-this._outputMin},t.Scale.prototype.dispose=function(){return t.prototype.dispose.call(this),this._add.dispose(),this._add=null,this._scale.dispose(),this._scale=null,this},t.Scale}(Tone_core_Tone,Tone_signal_Add,Tone_signal_Multiply);var signal;signal=function(){var t=Tone_signal_Signal,e=Tone_signal_Add,i=Tone_signal_Multiply,n=Tone_signal_Scale,o=Tone_core_Tone,s=master;o.setContext(s.audiocontext),p5.Signal=function(e){var i=new t(e);return i},t.prototype.fade=t.prototype.linearRampToValueAtTime,i.prototype.fade=t.prototype.fade,e.prototype.fade=t.prototype.fade,n.prototype.fade=t.prototype.fade,t.prototype.setInput=function(t){t.connect(this)},i.prototype.setInput=t.prototype.setInput,e.prototype.setInput=t.prototype.setInput,n.prototype.setInput=t.prototype.setInput,t.prototype.add=function(t){var i=new e(t);return this.connect(i),i},i.prototype.add=t.prototype.add,e.prototype.add=t.prototype.add,n.prototype.add=t.prototype.add,t.prototype.mult=function(t){var e=new i(t);return this.connect(e),e},i.prototype.mult=t.prototype.mult,e.prototype.mult=t.prototype.mult,n.prototype.mult=t.prototype.mult,t.prototype.scale=function(t,e,i,o){var s,r;4===arguments.length?(s=p5.prototype.map(i,t,e,0,1)-.5,r=p5.prototype.map(o,t,e,0,1)-.5):(s=arguments[0],r=arguments[1]);var a=new n(s,r);return this.connect(a),a},i.prototype.scale=t.prototype.scale,e.prototype.scale=t.prototype.scale,n.prototype.scale=t.prototype.scale}(Tone_signal_Signal,Tone_signal_Add,Tone_signal_Multiply,Tone_signal_Scale,Tone_core_Tone,master);var oscillator;oscillator=function(){var t=master,e=Tone_signal_Add,i=Tone_signal_Multiply,n=Tone_signal_Scale;p5.Oscillator=function(e,i){if("string"==typeof e){var n=i;i=e,e=n}if("number"==typeof i){var n=i;i=e,e=n}this.started=!1,this.phaseAmount=void 0,this.oscillator=t.audiocontext.createOscillator(),this.f=e||440,this.oscillator.type=i||"sine",this.oscillator.frequency.setValueAtTime(this.f,t.audiocontext.currentTime),this.output=t.audiocontext.createGain(),this._freqMods=[],this.output.gain.value=.5,this.output.gain.setValueAtTime(.5,t.audiocontext.currentTime),this.oscillator.connect(this.output),this.panPosition=0,this.connection=t.input,this.panner=new p5.Panner(this.output,this.connection,1),this.mathOps=[this.output],t.soundArray.push(this)},p5.Oscillator.prototype.start=function(e,i){if(this.started){var n=t.audiocontext.currentTime;this.stop(n)}if(!this.started){var o=i||this.f,s=this.oscillator.type;this.oscillator&&(this.oscillator.disconnect(),this.oscillator=void 0),this.oscillator=t.audiocontext.createOscillator(),this.oscillator.frequency.value=Math.abs(o),this.oscillator.type=s,this.oscillator.connect(this.output),e=e||0,this.oscillator.start(e+t.audiocontext.currentTime),this.freqNode=this.oscillator.frequency;for(var r in this._freqMods)"undefined"!=typeof this._freqMods[r].connect&&this._freqMods[r].connect(this.oscillator.frequency);this.started=!0}},p5.Oscillator.prototype.stop=function(e){if(this.started){var i=e||0,n=t.audiocontext.currentTime;this.oscillator.stop(i+n),this.started=!1}},p5.Oscillator.prototype.amp=function(e,i,n){var o=this;if("number"==typeof e){var i=i||0,n=n||0,s=t.audiocontext.currentTime;this.output.gain.linearRampToValueAtTime(e,s+n+i)}else{if(!e)return this.output.gain;e.connect(o.output.gain)}},p5.Oscillator.prototype.fade=p5.Oscillator.prototype.amp,p5.Oscillator.prototype.getAmp=function(){return this.output.gain.value},p5.Oscillator.prototype.freq=function(e,i,n){if("number"!=typeof e||isNaN(e)){if(!e)return this.oscillator.frequency;e.output&&(e=e.output),e.connect(this.oscillator.frequency),this._freqMods.push(e)}else{this.f=e;var o=t.audiocontext.currentTime,i=i||0,n=n||0;0===i?this.oscillator.frequency.setValueAtTime(e,n+o):e>0?this.oscillator.frequency.exponentialRampToValueAtTime(e,n+i+o):this.oscillator.frequency.linearRampToValueAtTime(e,n+i+o),this.phaseAmount&&this.phase(this.phaseAmount)}},p5.Oscillator.prototype.getFreq=function(){return this.oscillator.frequency.value},p5.Oscillator.prototype.setType=function(t){this.oscillator.type=t},p5.Oscillator.prototype.getType=function(){return this.oscillator.type},p5.Oscillator.prototype.connect=function(e){e?e.hasOwnProperty("input")?(this.panner.connect(e.input),this.connection=e.input):(this.panner.connect(e),this.connection=e):this.panner.connect(t.input)},p5.Oscillator.prototype.disconnect=function(){this.output.disconnect(),this.panner.disconnect(),this.output.connect(this.panner),this.oscMods=[]},p5.Oscillator.prototype.pan=function(t,e){this.panPosition=t,this.panner.pan(t,e)},p5.Oscillator.prototype.getPan=function(){return this.panPosition},p5.Oscillator.prototype.dispose=function(){var e=t.soundArray.indexOf(this);if(t.soundArray.splice(e,1),this.oscillator){var i=t.audiocontext.currentTime;this.stop(i),this.disconnect(),this.panner=null,this.oscillator=null}this.osc2&&this.osc2.dispose()},p5.Oscillator.prototype.phase=function(e){var i=p5.prototype.map(e,0,1,0,1/this.f),n=t.audiocontext.currentTime;this.phaseAmount=e,this.dNode||(this.dNode=t.audiocontext.createDelay(),this.oscillator.disconnect(),this.oscillator.connect(this.dNode),this.dNode.connect(this.output)),this.dNode.delayTime.setValueAtTime(i,n)};var o=function(t,e,i,n,o){var s=t.oscillator;for(var r in t.mathOps)t.mathOps[r]instanceof o&&(s.disconnect(),t.mathOps[r].dispose(),i=r,i<t.mathOps.length-2&&(n=t.mathOps[r+1]));return i===t.mathOps.length-1&&t.mathOps.push(n),r>0&&(s=t.mathOps[r-1]),s.disconnect(),s.connect(e),e.connect(n),t.mathOps[i]=e,t};p5.Oscillator.prototype.add=function(t){var i=new e(t),n=this.mathOps.length-1,s=this.output;return o(this,i,n,s,e)},p5.Oscillator.prototype.mult=function(t){var e=new i(t),n=this.mathOps.length-1,s=this.output;return o(this,e,n,s,i)},p5.Oscillator.prototype.scale=function(t,e,i,s){var r,a;4===arguments.length?(r=p5.prototype.map(i,t,e,0,1)-.5,a=p5.prototype.map(s,t,e,0,1)-.5):(r=arguments[0],a=arguments[1]);var u=new n(r,a),p=this.mathOps.length-1,c=this.output;return o(this,u,p,c,n)},p5.SinOsc=function(t){p5.Oscillator.call(this,t,"sine")},p5.SinOsc.prototype=Object.create(p5.Oscillator.prototype),p5.TriOsc=function(t){p5.Oscillator.call(this,t,"triangle")},p5.TriOsc.prototype=Object.create(p5.Oscillator.prototype),p5.SawOsc=function(t){p5.Oscillator.call(this,t,"sawtooth")},p5.SawOsc.prototype=Object.create(p5.Oscillator.prototype),p5.SqrOsc=function(t){p5.Oscillator.call(this,t,"square")},p5.SqrOsc.prototype=Object.create(p5.Oscillator.prototype)}(master,Tone_signal_Add,Tone_signal_Multiply,Tone_signal_Scale);var Tone_core_Timeline;Tone_core_Timeline=function(t){"use strict";return t.Timeline=function(){var e=this.optionsObject(arguments,["memory"],t.Timeline.defaults);this._timeline=[],this._toRemove=[],this._iterating=!1,this.memory=e.memory},t.extend(t.Timeline),t.Timeline.defaults={memory:1/0},Object.defineProperty(t.Timeline.prototype,"length",{get:function(){return this._timeline.length}}),t.Timeline.prototype.addEvent=function(t){if(this.isUndef(t.time))throw new Error("events must have a time attribute");if(t.time=this.toSeconds(t.time),this._timeline.length){var e=this._search(t.time);this._timeline.splice(e+1,0,t)}else this._timeline.push(t);if(this.length>this.memory){var i=this.length-this.memory;this._timeline.splice(0,i)}return this},t.Timeline.prototype.removeEvent=function(t){if(this._iterating)this._toRemove.push(t);else{var e=this._timeline.indexOf(t);-1!==e&&this._timeline.splice(e,1)}return this},t.Timeline.prototype.getEvent=function(t){t=this.toSeconds(t);var e=this._search(t);return-1!==e?this._timeline[e]:null},t.Timeline.prototype.getEventAfter=function(t){t=this.toSeconds(t);var e=this._search(t);return e+1<this._timeline.length?this._timeline[e+1]:null},t.Timeline.prototype.getEventBefore=function(t){t=this.toSeconds(t);var e=this._search(t);return e-1>=0?this._timeline[e-1]:null},t.Timeline.prototype.cancel=function(t){if(this._timeline.length>1){t=this.toSeconds(t);var e=this._search(t);e>=0?this._timeline=this._timeline.slice(0,e):this._timeline=[]}else 1===this._timeline.length&&this._timeline[0].time>=t&&(this._timeline=[]);return this},t.Timeline.prototype.cancelBefore=function(t){if(this._timeline.length){t=this.toSeconds(t);var e=this._search(t);e>=0&&(this._timeline=this._timeline.slice(e+1))}return this},t.Timeline.prototype._search=function(t){for(var e=0,i=this._timeline.length,n=i;n>=e&&i>e;){var o=Math.floor(e+(n-e)/2),s=this._timeline[o];if(s.time===t){for(var r=o;r<this._timeline.length;r++){var a=this._timeline[r];a.time===t&&(o=r)}return o}s.time>t?n=o-1:s.time<t&&(e=o+1)}return e-1},t.Timeline.prototype._iterate=function(t,e,i){this._iterating=!0,e=this.defaultArg(e,0),i=this.defaultArg(i,this._timeline.length-1);for(var n=e;i>=n;n++)t(this._timeline[n]);if(this._iterating=!1,this._toRemove.length>0){for(var o=0;o<this._toRemove.length;o++){var s=this._timeline.indexOf(this._toRemove[o]);-1!==s&&this._timeline.splice(s,1)}this._toRemove=[]}},t.Timeline.prototype.forEach=function(t){return this._iterate(t),this},t.Timeline.prototype.forEachBefore=function(t,e){t=this.toSeconds(t);var i=this._search(t);return-1!==i&&this._iterate(e,0,i),this},t.Timeline.prototype.forEachAfter=function(t,e){t=this.toSeconds(t);var i=this._search(t);return this._iterate(e,i+1),this},t.Timeline.prototype.forEachFrom=function(t,e){t=this.toSeconds(t);for(var i=this._search(t);i>=0&&this._timeline[i].time>=t;)i--;return this._iterate(e,i+1),this},t.Timeline.prototype.forEachAtTime=function(t,e){t=this.toSeconds(t);var i=this._search(t);return-1!==i&&this._iterate(function(i){i.time===t&&e(i)},0,i),this},t.Timeline.prototype.dispose=function(){t.prototype.dispose.call(this),this._timeline=null,this._toRemove=null},t.Timeline}(Tone_core_Tone);var Tone_signal_TimelineSignal;Tone_signal_TimelineSignal=function(t){"use strict";return t.TimelineSignal=function(){var e=this.optionsObject(arguments,["value","units"],t.Signal.defaults);t.Signal.apply(this,e),e.param=this._param,t.Param.call(this,e),this._events=new t.Timeline(10),this._initial=this._fromUnits(this._param.value)},t.extend(t.TimelineSignal,t.Param),t.TimelineSignal.Type={Linear:"linear",Exponential:"exponential",Target:"target",Set:"set"},Object.defineProperty(t.TimelineSignal.prototype,"value",{get:function(){return this._toUnits(this._param.value)},set:function(t){var e=this._fromUnits(t);this._initial=e,this._param.value=e}}),t.TimelineSignal.prototype.setValueAtTime=function(e,i){return e=this._fromUnits(e),i=this.toSeconds(i),this._events.addEvent({type:t.TimelineSignal.Type.Set,value:e,time:i}),this._param.setValueAtTime(e,i),this},t.TimelineSignal.prototype.linearRampToValueAtTime=function(e,i){return e=this._fromUnits(e),i=this.toSeconds(i),this._events.addEvent({type:t.TimelineSignal.Type.Linear,value:e,time:i}),this._param.linearRampToValueAtTime(e,i),this},t.TimelineSignal.prototype.exponentialRampToValueAtTime=function(e,i){return e=this._fromUnits(e),e=Math.max(this._minOutput,e),i=this.toSeconds(i),
this._events.addEvent({type:t.TimelineSignal.Type.Exponential,value:e,time:i}),this._param.exponentialRampToValueAtTime(e,i),this},t.TimelineSignal.prototype.setTargetAtTime=function(e,i,n){return e=this._fromUnits(e),e=Math.max(this._minOutput,e),n=Math.max(this._minOutput,n),i=this.toSeconds(i),this._events.addEvent({type:t.TimelineSignal.Type.Target,value:e,time:i,constant:n}),this._param.setTargetAtTime(e,i,n),this},t.TimelineSignal.prototype.cancelScheduledValues=function(t){return this._events.cancel(t),this._param.cancelScheduledValues(this.toSeconds(t)),this},t.TimelineSignal.prototype.setRampPoint=function(e){e=this.toSeconds(e);var i=this.getValueAtTime(e),n=this._searchAfter(e);return n&&(this.cancelScheduledValues(e),n.type===t.TimelineSignal.Type.Linear?this.linearRampToValueAtTime(i,e):n.type===t.TimelineSignal.Type.Exponential&&this.exponentialRampToValueAtTime(i,e)),this.setValueAtTime(i,e),this},t.TimelineSignal.prototype.linearRampToValueBetween=function(t,e,i){return this.setRampPoint(e),this.linearRampToValueAtTime(t,i),this},t.TimelineSignal.prototype.exponentialRampToValueBetween=function(t,e,i){return this.setRampPoint(e),this.exponentialRampToValueAtTime(t,i),this},t.TimelineSignal.prototype._searchBefore=function(t){return this._events.getEvent(t)},t.TimelineSignal.prototype._searchAfter=function(t){return this._events.getEventAfter(t)},t.TimelineSignal.prototype.getValueAtTime=function(e){var i=this._searchAfter(e),n=this._searchBefore(e),o=this._initial;if(null===n)o=this._initial;else if(n.type===t.TimelineSignal.Type.Target){var s,r=this._events.getEventBefore(n.time);s=null===r?this._initial:r.value,o=this._exponentialApproach(n.time,s,n.value,n.constant,e)}else o=null===i?n.value:i.type===t.TimelineSignal.Type.Linear?this._linearInterpolate(n.time,n.value,i.time,i.value,e):i.type===t.TimelineSignal.Type.Exponential?this._exponentialInterpolate(n.time,n.value,i.time,i.value,e):n.value;return o},t.TimelineSignal.prototype.connect=t.SignalBase.prototype.connect,t.TimelineSignal.prototype._exponentialApproach=function(t,e,i,n,o){return i+(e-i)*Math.exp(-(o-t)/n)},t.TimelineSignal.prototype._linearInterpolate=function(t,e,i,n,o){return e+(n-e)*((o-t)/(i-t))},t.TimelineSignal.prototype._exponentialInterpolate=function(t,e,i,n,o){return e=Math.max(this._minOutput,e),e*Math.pow(n/e,(o-t)/(i-t))},t.TimelineSignal.prototype.dispose=function(){t.Signal.prototype.dispose.call(this),t.Param.prototype.dispose.call(this),this._events.dispose(),this._events=null},t.TimelineSignal}(Tone_core_Tone,Tone_signal_Signal);var env;env=function(){var t=master,e=Tone_signal_Add,i=Tone_signal_Multiply,n=Tone_signal_Scale,o=Tone_signal_TimelineSignal,s=Tone_core_Tone;s.setContext(t.audiocontext),p5.Env=function(e,i,n,s,r,a){this.aTime=e||.1,this.aLevel=i||1,this.dTime=n||.5,this.dLevel=s||0,this.rTime=r||0,this.rLevel=a||0,this._rampHighPercentage=.98,this._rampLowPercentage=.02,this.output=t.audiocontext.createGain(),this.control=new o,this._init(),this.control.connect(this.output),this.connection=null,this.mathOps=[this.control],this.isExponential=!1,this.sourceToClear=null,this.wasTriggered=!1,t.soundArray.push(this)},p5.Env.prototype._init=function(){var e=t.audiocontext.currentTime,i=e;this.control.setTargetAtTime(1e-5,i,.001),this._setRampAD(this.aTime,this.dTime)},p5.Env.prototype.set=function(t,e,i,n,o,s){this.aTime=t,this.aLevel=e,this.dTime=i||0,this.dLevel=n||0,this.rTime=o||0,this.rLevel=s||0,this._setRampAD(t,i)},p5.Env.prototype.setADSR=function(t,e,i,n){this.aTime=t,this.dTime=e||0,this.sPercent=i||0,this.dLevel="undefined"!=typeof i?i*(this.aLevel-this.rLevel)+this.rLevel:0,this.rTime=n||0,this._setRampAD(t,e)},p5.Env.prototype.setRange=function(t,e){this.aLevel=t||1,this.rLevel=e||0},p5.Env.prototype._setRampAD=function(t,e){this._rampAttackTime=this.checkExpInput(t),this._rampDecayTime=this.checkExpInput(e);var i=1;i=Math.log(1/this.checkExpInput(1-this._rampHighPercentage)),this._rampAttackTC=t/this.checkExpInput(i),i=Math.log(1/this._rampLowPercentage),this._rampDecayTC=e/this.checkExpInput(i)},p5.Env.prototype.setRampPercentages=function(t,e){this._rampHighPercentage=this.checkExpInput(t),this._rampLowPercentage=this.checkExpInput(e);var i=1;i=Math.log(1/this.checkExpInput(1-this._rampHighPercentage)),this._rampAttackTC=this._rampAttackTime/this.checkExpInput(i),i=Math.log(1/this._rampLowPercentage),this._rampDecayTC=this._rampDecayTime/this.checkExpInput(i)},p5.Env.prototype.setInput=function(){for(var t=0;t<arguments.length;t++)this.connect(arguments[t])},p5.Env.prototype.setExp=function(t){this.isExponential=t},p5.Env.prototype.checkExpInput=function(t){return 0>=t&&(t=1e-8),t},p5.Env.prototype.play=function(t,e,i){var n=e||0,i=i||0;t&&this.connection!==t&&this.connect(t),this.triggerAttack(t,n),this.triggerRelease(t,n+this.aTime+this.dTime+i)},p5.Env.prototype.triggerAttack=function(e,i){var n=t.audiocontext.currentTime,o=i||0,s=n+o;this.lastAttack=s,this.wasTriggered=!0,e&&this.connection!==e&&this.connect(e);var r=this.control.getValueAtTime(s);this.isExponential===!0?this.control.exponentialRampToValueAtTime(this.checkExpInput(r),s):this.control.linearRampToValueAtTime(r,s),s+=this.aTime,this.isExponential===!0?(this.control.exponentialRampToValueAtTime(this.checkExpInput(this.aLevel),s),r=this.checkExpInput(this.control.getValueAtTime(s)),this.control.cancelScheduledValues(s),this.control.exponentialRampToValueAtTime(r,s)):(this.control.linearRampToValueAtTime(this.aLevel,s),r=this.control.getValueAtTime(s),this.control.cancelScheduledValues(s),this.control.linearRampToValueAtTime(r,s)),s+=this.dTime,this.isExponential===!0?(this.control.exponentialRampToValueAtTime(this.checkExpInput(this.dLevel),s),r=this.checkExpInput(this.control.getValueAtTime(s)),this.control.cancelScheduledValues(s),this.control.exponentialRampToValueAtTime(r,s)):(this.control.linearRampToValueAtTime(this.dLevel,s),r=this.control.getValueAtTime(s),this.control.cancelScheduledValues(s),this.control.linearRampToValueAtTime(r,s))},p5.Env.prototype.triggerRelease=function(e,i){if(this.wasTriggered){var n=t.audiocontext.currentTime,o=i||0,s=n+o;e&&this.connection!==e&&this.connect(e);var r=this.control.getValueAtTime(s);this.isExponential===!0?this.control.exponentialRampToValueAtTime(this.checkExpInput(r),s):this.control.linearRampToValueAtTime(r,s),s+=this.rTime,this.isExponential===!0?(this.control.exponentialRampToValueAtTime(this.checkExpInput(this.rLevel),s),r=this.checkExpInput(this.control.getValueAtTime(s)),this.control.cancelScheduledValues(s),this.control.exponentialRampToValueAtTime(r,s)):(this.control.linearRampToValueAtTime(this.rLevel,s),r=this.control.getValueAtTime(s),this.control.cancelScheduledValues(s),this.control.linearRampToValueAtTime(r,s)),this.wasTriggered=!1}},p5.Env.prototype.ramp=function(e,i,n,o){var s=t.audiocontext.currentTime,r=i||0,a=s+r,u=this.checkExpInput(n),p="undefined"!=typeof o?this.checkExpInput(o):void 0;e&&this.connection!==e&&this.connect(e);var c=this.checkExpInput(this.control.getValueAtTime(a));u>c?(this.control.setTargetAtTime(u,a,this._rampAttackTC),a+=this._rampAttackTime):c>u&&(this.control.setTargetAtTime(u,a,this._rampDecayTC),a+=this._rampDecayTime),void 0!==p&&(p>u?this.control.setTargetAtTime(p,a,this._rampAttackTC):u>p&&this.control.setTargetAtTime(p,a,this._rampDecayTC))},p5.Env.prototype.connect=function(e){this.connection=e,(e instanceof p5.Oscillator||e instanceof p5.SoundFile||e instanceof p5.AudioIn||e instanceof p5.Reverb||e instanceof p5.Noise||e instanceof p5.Filter||e instanceof p5.Delay)&&(e=e.output.gain),e instanceof AudioParam&&e.setValueAtTime(0,t.audiocontext.currentTime),e instanceof p5.Signal&&e.setValue(0),this.output.connect(e)},p5.Env.prototype.disconnect=function(){this.output.disconnect()},p5.Env.prototype.add=function(t){var i=new e(t),n=this.mathOps.length,o=this.output;return p5.prototype._mathChain(this,i,n,o,e)},p5.Env.prototype.mult=function(t){var e=new i(t),n=this.mathOps.length,o=this.output;return p5.prototype._mathChain(this,e,n,o,i)},p5.Env.prototype.scale=function(t,e,i,o){var s=new n(t,e,i,o),r=this.mathOps.length,a=this.output;return p5.prototype._mathChain(this,s,r,a,n)},p5.Env.prototype.dispose=function(){var e=t.soundArray.indexOf(this);t.soundArray.splice(e,1),this.disconnect();try{this.control.dispose(),this.control=null}catch(i){console.warn(i,"already disposed p5.Env")}for(var n=1;n<this.mathOps.length;n++)this.mathOps[n].dispose()}}(master,Tone_signal_Add,Tone_signal_Multiply,Tone_signal_Scale,Tone_signal_TimelineSignal,Tone_core_Tone);var pulse;pulse=function(){function t(){for(var t=e.audiocontext,i=t.createBuffer(1,2048,t.sampleRate),n=i.getChannelData(0),o=0;2048>o;o++)n[o]=1;var s=t.createBufferSource();return s.buffer=i,s.loop=!0,s}var e=master;p5.Pulse=function(i,n){p5.Oscillator.call(this,i,"sawtooth"),this.w=n||0,this.osc2=new p5.SawOsc(i),this.dNode=e.audiocontext.createDelay(),this.dcOffset=t(),this.dcGain=e.audiocontext.createGain(),this.dcOffset.connect(this.dcGain),this.dcGain.connect(this.output),this.f=i||440;var o=this.w/this.oscillator.frequency.value;this.dNode.delayTime.value=o,this.dcGain.gain.value=1.7*(.5-this.w),this.osc2.disconnect(),this.osc2.panner.disconnect(),this.osc2.amp(-1),this.osc2.output.connect(this.dNode),this.dNode.connect(this.output),this.output.gain.value=1,this.output.connect(this.panner)},p5.Pulse.prototype=Object.create(p5.Oscillator.prototype),p5.Pulse.prototype.width=function(t){if("number"==typeof t){if(1>=t&&t>=0){this.w=t;var e=this.w/this.oscillator.frequency.value;this.dNode.delayTime.value=e}this.dcGain.gain.value=1.7*(.5-this.w)}else{t.connect(this.dNode.delayTime);var i=new p5.SignalAdd(-.5);i.setInput(t),i=i.mult(-1),i=i.mult(1.7),i.connect(this.dcGain.gain)}},p5.Pulse.prototype.start=function(i,n){var o=e.audiocontext.currentTime,s=n||0;if(!this.started){var r=i||this.f,a=this.oscillator.type;this.oscillator=e.audiocontext.createOscillator(),this.oscillator.frequency.setValueAtTime(r,o),this.oscillator.type=a,this.oscillator.connect(this.output),this.oscillator.start(s+o),this.osc2.oscillator=e.audiocontext.createOscillator(),this.osc2.oscillator.frequency.setValueAtTime(r,s+o),this.osc2.oscillator.type=a,this.osc2.oscillator.connect(this.osc2.output),this.osc2.start(s+o),this.freqNode=[this.oscillator.frequency,this.osc2.oscillator.frequency],this.dcOffset=t(),this.dcOffset.connect(this.dcGain),this.dcOffset.start(s+o),void 0!==this.mods&&void 0!==this.mods.frequency&&(this.mods.frequency.connect(this.freqNode[0]),this.mods.frequency.connect(this.freqNode[1])),this.started=!0,this.osc2.started=!0}},p5.Pulse.prototype.stop=function(t){if(this.started){var i=t||0,n=e.audiocontext.currentTime;this.oscillator.stop(i+n),this.osc2.oscillator.stop(i+n),this.dcOffset.stop(i+n),this.started=!1,this.osc2.started=!1}},p5.Pulse.prototype.freq=function(t,i,n){if("number"==typeof t){this.f=t;var o=e.audiocontext.currentTime,i=i||0,n=n||0,s=this.oscillator.frequency.value;this.oscillator.frequency.cancelScheduledValues(o),this.oscillator.frequency.setValueAtTime(s,o+n),this.oscillator.frequency.exponentialRampToValueAtTime(t,n+i+o),this.osc2.oscillator.frequency.cancelScheduledValues(o),this.osc2.oscillator.frequency.setValueAtTime(s,o+n),this.osc2.oscillator.frequency.exponentialRampToValueAtTime(t,n+i+o),this.freqMod&&(this.freqMod.output.disconnect(),this.freqMod=null)}else t.output&&(t.output.disconnect(),t.output.connect(this.oscillator.frequency),t.output.connect(this.osc2.oscillator.frequency),this.freqMod=t)}}(master,oscillator);var noise;noise=function(){var t=master;p5.Noise=function(t){var o;p5.Oscillator.call(this),delete this.f,delete this.freq,delete this.oscillator,o="brown"===t?n:"pink"===t?i:e,this.buffer=o},p5.Noise.prototype=Object.create(p5.Oscillator.prototype);var e=function(){for(var e=2*t.audiocontext.sampleRate,i=t.audiocontext.createBuffer(1,e,t.audiocontext.sampleRate),n=i.getChannelData(0),o=0;e>o;o++)n[o]=2*Math.random()-1;return i.type="white",i}(),i=function(){var e,i,n,o,s,r,a,u=2*t.audiocontext.sampleRate,p=t.audiocontext.createBuffer(1,u,t.audiocontext.sampleRate),c=p.getChannelData(0);e=i=n=o=s=r=a=0;for(var h=0;u>h;h++){var l=2*Math.random()-1;e=.99886*e+.0555179*l,i=.99332*i+.0750759*l,n=.969*n+.153852*l,o=.8665*o+.3104856*l,s=.55*s+.5329522*l,r=-.7616*r-.016898*l,c[h]=e+i+n+o+s+r+a+.5362*l,c[h]*=.11,a=.115926*l}return p.type="pink",p}(),n=function(){for(var e=2*t.audiocontext.sampleRate,i=t.audiocontext.createBuffer(1,e,t.audiocontext.sampleRate),n=i.getChannelData(0),o=0,s=0;e>s;s++){var r=2*Math.random()-1;n[s]=(o+.02*r)/1.02,o=n[s],n[s]*=3.5}return i.type="brown",i}();p5.Noise.prototype.setType=function(o){switch(o){case"white":this.buffer=e;break;case"pink":this.buffer=i;break;case"brown":this.buffer=n;break;default:this.buffer=e}if(this.started){var s=t.audiocontext.currentTime;this.stop(s),this.start(s+.01)}},p5.Noise.prototype.getType=function(){return this.buffer.type},p5.Noise.prototype.start=function(){this.started&&this.stop(),this.noise=t.audiocontext.createBufferSource(),this.noise.buffer=this.buffer,this.noise.loop=!0,this.noise.connect(this.output);var e=t.audiocontext.currentTime;this.noise.start(e),this.started=!0},p5.Noise.prototype.stop=function(){var e=t.audiocontext.currentTime;this.noise&&(this.noise.stop(e),this.started=!1)},p5.Noise.prototype.dispose=function(){var e=t.audiocontext.currentTime,i=t.soundArray.indexOf(this);t.soundArray.splice(i,1),this.noise&&(this.noise.disconnect(),this.stop(e)),this.output&&this.output.disconnect(),this.panner&&this.panner.disconnect(),this.output=null,this.panner=null,this.buffer=null,this.noise=null}}(master);var audioin;audioin=function(){var t=master;p5.AudioIn=function(e){this.input=t.audiocontext.createGain(),this.output=t.audiocontext.createGain(),this.stream=null,this.mediaStream=null,this.currentSource=0,this.enabled=!1,this.amplitude=new p5.Amplitude,this.output.connect(this.amplitude.input),"undefined"==typeof window.MediaStreamTrack?e?e():window.alert("This browser does not support AudioIn"):"function"==typeof window.MediaDevices.enumerateDevices&&window.MediaDevices.enumerateDevices(this._gotSources),t.soundArray.push(this)},p5.AudioIn.prototype.start=function(e,i){var n=this;if(t.inputSources[n.currentSource]){var o=t.inputSources[n.currentSource].id,s={audio:{optional:[{sourceId:o}]}};window.navigator.getUserMedia(s,this._onStream=function(i){n.stream=i,n.enabled=!0,n.mediaStream=t.audiocontext.createMediaStreamSource(i),n.mediaStream.connect(n.output),e&&e(),n.amplitude.setInput(n.output)},this._onStreamError=function(t){i?i(t):console.error(t)})}else window.navigator.getUserMedia({audio:!0},this._onStream=function(i){n.stream=i,n.enabled=!0,n.mediaStream=t.audiocontext.createMediaStreamSource(i),n.mediaStream.connect(n.output),n.amplitude.setInput(n.output),e&&e()},this._onStreamError=function(t){i?i(t):console.error(t)})},p5.AudioIn.prototype.stop=function(){this.stream&&this.stream.getTracks()[0].stop()},p5.AudioIn.prototype.connect=function(e){e?e.hasOwnProperty("input")?this.output.connect(e.input):e.hasOwnProperty("analyser")?this.output.connect(e.analyser):this.output.connect(e):this.output.connect(t.input)},p5.AudioIn.prototype.disconnect=function(){this.output.disconnect(),this.output.connect(this.amplitude.input)},p5.AudioIn.prototype.getLevel=function(t){return t&&(this.amplitude.smoothing=t),this.amplitude.getLevel()},p5.AudioIn.prototype._gotSources=function(t){for(var e=0;e<t.length;e++){var i=t[e];if("audio"===i.kind)return i}},p5.AudioIn.prototype.amp=function(e,i){if(i){var n=i||0,o=this.output.gain.value;this.output.gain.cancelScheduledValues(t.audiocontext.currentTime),this.output.gain.setValueAtTime(o,t.audiocontext.currentTime),this.output.gain.linearRampToValueAtTime(e,n+t.audiocontext.currentTime)}else this.output.gain.cancelScheduledValues(t.audiocontext.currentTime),this.output.gain.setValueAtTime(e,t.audiocontext.currentTime)},p5.AudioIn.prototype.listSources=function(){return console.log("listSources is deprecated - please use AudioIn.getSources"),console.log("input sources: "),t.inputSources.length>0?t.inputSources:"This browser does not support MediaStreamTrack.getSources()"},p5.AudioIn.prototype.getSources=function(e){"function"==typeof window.MediaStreamTrack.getSources?window.MediaStreamTrack.getSources(function(i){for(var n=0,o=i.length;o>n;n++){var s=i[n];"audio"===s.kind&&t.inputSources.push(s)}e(t.inputSources)}):console.log("This browser does not support MediaStreamTrack.getSources()")},p5.AudioIn.prototype.setSource=function(e){var i=this;t.inputSources.length>0&&e<t.inputSources.length?(i.currentSource=e,console.log("set source to "+t.inputSources[i.currentSource].id)):console.log("unable to set input source")},p5.AudioIn.prototype.dispose=function(){var e=t.soundArray.indexOf(this);t.soundArray.splice(e,1),this.stop(),this.output&&this.output.disconnect(),this.amplitude&&this.amplitude.disconnect(),this.amplitude=null,this.output=null}}(master);var Tone_signal_Negate;Tone_signal_Negate=function(t){"use strict";return t.Negate=function(){this._multiply=this.input=this.output=new t.Multiply(-1)},t.extend(t.Negate,t.SignalBase),t.Negate.prototype.dispose=function(){return t.prototype.dispose.call(this),this._multiply.dispose(),this._multiply=null,this},t.Negate}(Tone_core_Tone,Tone_signal_Multiply);var Tone_signal_Subtract;Tone_signal_Subtract=function(t){"use strict";return t.Subtract=function(e){t.call(this,2,0),this._sum=this.input[0]=this.output=this.context.createGain(),this._neg=new t.Negate,this._param=this.input[1]=new t.Signal(e),this._param.chain(this._neg,this._sum)},t.extend(t.Subtract,t.Signal),t.Subtract.prototype.dispose=function(){return t.prototype.dispose.call(this),this._neg.dispose(),this._neg=null,this._sum.disconnect(),this._sum=null,this._param.dispose(),this._param=null,this},t.Subtract}(Tone_core_Tone,Tone_signal_Add,Tone_signal_Negate);var Tone_signal_GreaterThanZero;Tone_signal_GreaterThanZero=function(t){"use strict";return t.GreaterThanZero=function(){this._thresh=this.output=new t.WaveShaper(function(t){return 0>=t?0:1}),this._scale=this.input=new t.Multiply(1e4),this._scale.connect(this._thresh)},t.extend(t.GreaterThanZero,t.SignalBase),t.GreaterThanZero.prototype.dispose=function(){return t.prototype.dispose.call(this),this._scale.dispose(),this._scale=null,this._thresh.dispose(),this._thresh=null,this},t.GreaterThanZero}(Tone_core_Tone,Tone_signal_Signal,Tone_signal_Multiply);var Tone_signal_EqualZero;Tone_signal_EqualZero=function(t){"use strict";return t.EqualZero=function(){this._scale=this.input=new t.Multiply(1e4),this._thresh=new t.WaveShaper(function(t){return 0===t?1:0},128),this._gtz=this.output=new t.GreaterThanZero,this._scale.chain(this._thresh,this._gtz)},t.extend(t.EqualZero,t.SignalBase),t.EqualZero.prototype.dispose=function(){return t.prototype.dispose.call(this),this._gtz.dispose(),this._gtz=null,this._scale.dispose(),this._scale=null,this._thresh.dispose(),this._thresh=null,this},t.EqualZero}(Tone_core_Tone,Tone_signal_Signal,Tone_signal_GreaterThanZero);var Tone_signal_Equal;Tone_signal_Equal=function(t){"use strict";return t.Equal=function(e){t.call(this,2,0),this._sub=this.input[0]=new t.Subtract(e),this._equals=this.output=new t.EqualZero,this._sub.connect(this._equals),this.input[1]=this._sub.input[1]},t.extend(t.Equal,t.SignalBase),Object.defineProperty(t.Equal.prototype,"value",{get:function(){return this._sub.value},set:function(t){this._sub.value=t}}),t.Equal.prototype.dispose=function(){return t.prototype.dispose.call(this),this._equals.dispose(),this._equals=null,this._sub.dispose(),this._sub=null,this},t.Equal}(Tone_core_Tone,Tone_signal_EqualZero,Tone_signal_Subtract);var Tone_signal_Select;Tone_signal_Select=function(t){"use strict";t.Select=function(i){i=this.defaultArg(i,2),t.call(this,i,1),this.gate=new t.Signal(0),this._readOnly("gate");for(var n=0;i>n;n++){var o=new e(n);this.input[n]=o,this.gate.connect(o.selecter),o.connect(this.output)}},t.extend(t.Select,t.SignalBase),t.Select.prototype.select=function(t,e){return t=Math.floor(t),this.gate.setValueAtTime(t,this.toSeconds(e)),this},t.Select.prototype.dispose=function(){this._writable("gate"),this.gate.dispose(),this.gate=null;for(var e=0;e<this.input.length;e++)this.input[e].dispose(),this.input[e]=null;return t.prototype.dispose.call(this),this};var e=function(e){this.selecter=new t.Equal(e),this.gate=this.input=this.output=this.context.createGain(),this.selecter.connect(this.gate.gain)};return t.extend(e),e.prototype.dispose=function(){t.prototype.dispose.call(this),this.selecter.dispose(),this.gate.disconnect(),this.selecter=null,this.gate=null},t.Select}(Tone_core_Tone,Tone_signal_Equal);var Tone_signal_IfThenElse;Tone_signal_IfThenElse=function(t){"use strict";return t.IfThenElse=function(){t.call(this,3,0),this._selector=this.output=new t.Select(2),this["if"]=this.input[0]=this._selector.gate,this.then=this.input[1]=this._selector.input[1],this["else"]=this.input[2]=this._selector.input[0]},t.extend(t.IfThenElse,t.SignalBase),t.IfThenElse.prototype.dispose=function(){return t.prototype.dispose.call(this),this._selector.dispose(),this._selector=null,this["if"]=null,this.then=null,this["else"]=null,this},t.IfThenElse}(Tone_core_Tone,Tone_signal_Select);var Tone_signal_OR;Tone_signal_OR=function(t){"use strict";return t.OR=function(e){e=this.defaultArg(e,2),t.call(this,e,0),this._sum=this.context.createGain(),this._gtz=this.output=new t.GreaterThanZero;for(var i=0;e>i;i++)this.input[i]=this._sum;this._sum.connect(this._gtz)},t.extend(t.OR,t.SignalBase),t.OR.prototype.dispose=function(){return t.prototype.dispose.call(this),this._gtz.dispose(),this._gtz=null,this._sum.disconnect(),this._sum=null,this},t.OR}(Tone_core_Tone);var Tone_signal_AND;Tone_signal_AND=function(t){"use strict";return t.AND=function(e){e=this.defaultArg(e,2),t.call(this,e,0),this._equals=this.output=new t.Equal(e);for(var i=0;e>i;i++)this.input[i]=this._equals},t.extend(t.AND,t.SignalBase),t.AND.prototype.dispose=function(){return t.prototype.dispose.call(this),this._equals.dispose(),this._equals=null,this},t.AND}(Tone_core_Tone);var Tone_signal_NOT;Tone_signal_NOT=function(t){"use strict";return t.NOT=t.EqualZero,t.NOT}(Tone_core_Tone);var Tone_signal_GreaterThan;Tone_signal_GreaterThan=function(t){"use strict";return t.GreaterThan=function(e){t.call(this,2,0),this._param=this.input[0]=new t.Subtract(e),this.input[1]=this._param.input[1],this._gtz=this.output=new t.GreaterThanZero,this._param.connect(this._gtz)},t.extend(t.GreaterThan,t.Signal),t.GreaterThan.prototype.dispose=function(){return t.prototype.dispose.call(this),this._param.dispose(),this._param=null,this._gtz.dispose(),this._gtz=null,this},t.GreaterThan}(Tone_core_Tone,Tone_signal_GreaterThanZero,Tone_signal_Subtract);var Tone_signal_LessThan;Tone_signal_LessThan=function(t){"use strict";return t.LessThan=function(e){t.call(this,2,0),this._neg=this.input[0]=new t.Negate,this._gt=this.output=new t.GreaterThan,this._rhNeg=new t.Negate,this._param=this.input[1]=new t.Signal(e),this._neg.connect(this._gt),this._param.connect(this._rhNeg),this._rhNeg.connect(this._gt,0,1)},t.extend(t.LessThan,t.Signal),t.LessThan.prototype.dispose=function(){return t.prototype.dispose.call(this),this._neg.dispose(),this._neg=null,this._gt.dispose(),this._gt=null,this._rhNeg.dispose(),this._rhNeg=null,this._param.dispose(),this._param=null,this},t.LessThan}(Tone_core_Tone,Tone_signal_GreaterThan,Tone_signal_Negate);var Tone_signal_Abs;Tone_signal_Abs=function(t){"use strict";return t.Abs=function(){t.call(this,1,0),this._ltz=new t.LessThan(0),this._switch=this.output=new t.Select(2),this._negate=new t.Negate,this.input.connect(this._switch,0,0),this.input.connect(this._negate),this._negate.connect(this._switch,0,1),this.input.chain(this._ltz,this._switch.gate)},t.extend(t.Abs,t.SignalBase),t.Abs.prototype.dispose=function(){return t.prototype.dispose.call(this),this._switch.dispose(),this._switch=null,this._ltz.dispose(),this._ltz=null,this._negate.dispose(),this._negate=null,this},t.Abs}(Tone_core_Tone,Tone_signal_Select,Tone_signal_Negate,Tone_signal_LessThan);var Tone_signal_Max;Tone_signal_Max=function(t){"use strict";return t.Max=function(e){t.call(this,2,0),this.input[0]=this.context.createGain(),this._param=this.input[1]=new t.Signal(e),this._ifThenElse=this.output=new t.IfThenElse,this._gt=new t.GreaterThan,this.input[0].chain(this._gt,this._ifThenElse["if"]),this.input[0].connect(this._ifThenElse.then),this._param.connect(this._ifThenElse["else"]),this._param.connect(this._gt,0,1)},t.extend(t.Max,t.Signal),t.Max.prototype.dispose=function(){return t.prototype.dispose.call(this),this._param.dispose(),this._ifThenElse.dispose(),this._gt.dispose(),this._param=null,this._ifThenElse=null,this._gt=null,this},t.Max}(Tone_core_Tone,Tone_signal_GreaterThan,Tone_signal_IfThenElse);var Tone_signal_Min;Tone_signal_Min=function(t){"use strict";return t.Min=function(e){t.call(this,2,0),this.input[0]=this.context.createGain(),this._ifThenElse=this.output=new t.IfThenElse,this._lt=new t.LessThan,this._param=this.input[1]=new t.Signal(e),this.input[0].chain(this._lt,this._ifThenElse["if"]),this.input[0].connect(this._ifThenElse.then),this._param.connect(this._ifThenElse["else"]),this._param.connect(this._lt,0,1)},t.extend(t.Min,t.Signal),t.Min.prototype.dispose=function(){return t.prototype.dispose.call(this),this._param.dispose(),this._ifThenElse.dispose(),this._lt.dispose(),this._param=null,this._ifThenElse=null,this._lt=null,this},t.Min}(Tone_core_Tone,Tone_signal_LessThan,Tone_signal_IfThenElse);var Tone_signal_Modulo;Tone_signal_Modulo=function(t){"use strict";return t.Modulo=function(e){t.call(this,1,1),this._shaper=new t.WaveShaper(Math.pow(2,16)),this._multiply=new t.Multiply,this._subtract=this.output=new t.Subtract,this._modSignal=new t.Signal(e),this.input.fan(this._shaper,this._subtract),this._modSignal.connect(this._multiply,0,0),this._shaper.connect(this._multiply,0,1),this._multiply.connect(this._subtract,0,1),this._setWaveShaper(e)},t.extend(t.Modulo,t.SignalBase),t.Modulo.prototype._setWaveShaper=function(t){this._shaper.setMap(function(e){var i=Math.floor((e+1e-4)/t);return i})},Object.defineProperty(t.Modulo.prototype,"value",{get:function(){return this._modSignal.value},set:function(t){this._modSignal.value=t,this._setWaveShaper(t)}}),t.Modulo.prototype.dispose=function(){return t.prototype.dispose.call(this),this._shaper.dispose(),this._shaper=null,this._multiply.dispose(),this._multiply=null,this._subtract.dispose(),this._subtract=null,this._modSignal.dispose(),this._modSignal=null,this},t.Modulo}(Tone_core_Tone,Tone_signal_WaveShaper,Tone_signal_Multiply);var Tone_signal_Pow;Tone_signal_Pow=function(t){"use strict";return t.Pow=function(e){this._exp=this.defaultArg(e,1),this._expScaler=this.input=this.output=new t.WaveShaper(this._expFunc(this._exp),8192)},t.extend(t.Pow,t.SignalBase),Object.defineProperty(t.Pow.prototype,"value",{get:function(){return this._exp},set:function(t){this._exp=t,this._expScaler.setMap(this._expFunc(this._exp))}}),t.Pow.prototype._expFunc=function(t){return function(e){return Math.pow(Math.abs(e),t)}},t.Pow.prototype.dispose=function(){return t.prototype.dispose.call(this),this._expScaler.dispose(),this._expScaler=null,this},t.Pow}(Tone_core_Tone);var Tone_signal_AudioToGain;Tone_signal_AudioToGain=function(t){"use strict";return t.AudioToGain=function(){this._norm=this.input=this.output=new t.WaveShaper(function(t){return(t+1)/2})},t.extend(t.AudioToGain,t.SignalBase),t.AudioToGain.prototype.dispose=function(){return t.prototype.dispose.call(this),this._norm.dispose(),this._norm=null,this},t.AudioToGain}(Tone_core_Tone,Tone_signal_WaveShaper);var Tone_signal_Expr;Tone_signal_Expr=function(t){"use strict";function e(t,e,i){var n=new t;return i._eval(e[0]).connect(n,0,0),i._eval(e[1]).connect(n,0,1),n}function i(t,e,i){var n=new t;return i._eval(e[0]).connect(n,0,0),n}function n(t){return t?parseFloat(t):void 0}function o(t){return t&&t.args?parseFloat(t.args):void 0}return t.Expr=function(){var t=this._replacements(Array.prototype.slice.call(arguments)),e=this._parseInputs(t);this._nodes=[],this.input=new Array(e);for(var i=0;e>i;i++)this.input[i]=this.context.createGain();var n,o=this._parseTree(t);try{n=this._eval(o)}catch(s){throw this._disposeNodes(),new Error("Could evaluate expression: "+t)}this.output=n},t.extend(t.Expr,t.SignalBase),t.Expr._Expressions={value:{signal:{regexp:/^\d+\.\d+|^\d+/,method:function(e){var i=new t.Signal(n(e));return i}},input:{regexp:/^\$\d/,method:function(t,e){return e.input[n(t.substr(1))]}}},glue:{"(":{regexp:/^\(/},")":{regexp:/^\)/},",":{regexp:/^,/}},func:{abs:{regexp:/^abs/,method:i.bind(this,t.Abs)},min:{regexp:/^min/,method:e.bind(this,t.Min)},max:{regexp:/^max/,method:e.bind(this,t.Max)},"if":{regexp:/^if/,method:function(e,i){var n=new t.IfThenElse;return i._eval(e[0]).connect(n["if"]),i._eval(e[1]).connect(n.then),i._eval(e[2]).connect(n["else"]),n}},gt0:{regexp:/^gt0/,method:i.bind(this,t.GreaterThanZero)},eq0:{regexp:/^eq0/,method:i.bind(this,t.EqualZero)},mod:{regexp:/^mod/,method:function(e,i){var n=o(e[1]),s=new t.Modulo(n);return i._eval(e[0]).connect(s),s}},pow:{regexp:/^pow/,method:function(e,i){var n=o(e[1]),s=new t.Pow(n);return i._eval(e[0]).connect(s),s}},a2g:{regexp:/^a2g/,method:function(e,i){var n=new t.AudioToGain;return i._eval(e[0]).connect(n),n}}},binary:{"+":{regexp:/^\+/,precedence:1,method:e.bind(this,t.Add)},"-":{regexp:/^\-/,precedence:1,method:function(n,o){return 1===n.length?i(t.Negate,n,o):e(t.Subtract,n,o)}},"*":{regexp:/^\*/,precedence:0,method:e.bind(this,t.Multiply)},">":{regexp:/^\>/,precedence:2,method:e.bind(this,t.GreaterThan)},"<":{regexp:/^</,precedence:2,method:e.bind(this,t.LessThan)},"==":{regexp:/^==/,precedence:3,method:e.bind(this,t.Equal)},"&&":{regexp:/^&&/,precedence:4,method:e.bind(this,t.AND)},"||":{regexp:/^\|\|/,precedence:5,method:e.bind(this,t.OR)}},unary:{"-":{regexp:/^\-/,method:i.bind(this,t.Negate)},"!":{regexp:/^\!/,method:i.bind(this,t.NOT)}}},t.Expr.prototype._parseInputs=function(t){var e=t.match(/\$\d/g),i=0;if(null!==e)for(var n=0;n<e.length;n++){var o=parseInt(e[n].substr(1))+1;i=Math.max(i,o)}return i},t.Expr.prototype._replacements=function(t){for(var e=t.shift(),i=0;i<t.length;i++)e=e.replace(/\%/i,t[i]);return e},t.Expr.prototype._tokenize=function(e){function i(e){for(var i in t.Expr._Expressions){var n=t.Expr._Expressions[i];for(var o in n){var s=n[o],r=s.regexp,a=e.match(r);if(null!==a)return{type:i,value:a[0],method:s.method}}}throw new SyntaxError("Unexpected token "+e)}for(var n=-1,o=[];e.length>0;){e=e.trim();var s=i(e);o.push(s),e=e.substr(s.value.length)}return{next:function(){return o[++n]},peek:function(){return o[n+1]}}},t.Expr.prototype._parseTree=function(e){function i(t,e){return!c(t)&&"glue"===t.type&&t.value===e}function n(e,i,n){var o=!1,s=t.Expr._Expressions[i];if(!c(e))for(var r in s){var a=s[r];if(a.regexp.test(e.value)){if(c(n))return!0;if(a.precedence===n)return!0}}return o}function o(t){c(t)&&(t=5);var e;e=0>t?s():o(t-1);for(var i=p.peek();n(i,"binary",t);)i=p.next(),e={operator:i.value,method:i.method,args:[e,o(t)]},i=p.peek();return e}function s(){var t,e;return t=p.peek(),n(t,"unary")?(t=p.next(),e=s(),{operator:t.value,method:t.method,args:[e]}):r()}function r(){var t,e;if(t=p.peek(),c(t))throw new SyntaxError("Unexpected termination of expression");if("func"===t.type)return t=p.next(),a(t);if("value"===t.type)return t=p.next(),{method:t.method,args:t.value};if(i(t,"(")){if(p.next(),e=o(),t=p.next(),!i(t,")"))throw new SyntaxError("Expected )");return e}throw new SyntaxError("Parse error, cannot process token "+t.value)}function a(t){var e,n=[];if(e=p.next(),!i(e,"("))throw new SyntaxError('Expected ( in a function call "'+t.value+'"');if(e=p.peek(),i(e,")")||(n=u()),
e=p.next(),!i(e,")"))throw new SyntaxError('Expected ) in a function call "'+t.value+'"');return{method:t.method,args:n,name:name}}function u(){for(var t,e,n=[];;){if(e=o(),c(e))break;if(n.push(e),t=p.peek(),!i(t,","))break;p.next()}return n}var p=this._tokenize(e),c=this.isUndef.bind(this);return o()},t.Expr.prototype._eval=function(t){if(!this.isUndef(t)){var e=t.method(t.args,this);return this._nodes.push(e),e}},t.Expr.prototype._disposeNodes=function(){for(var t=0;t<this._nodes.length;t++){var e=this._nodes[t];this.isFunction(e.dispose)?e.dispose():this.isFunction(e.disconnect)&&e.disconnect(),e=null,this._nodes[t]=null}this._nodes=null},t.Expr.prototype.dispose=function(){t.prototype.dispose.call(this),this._disposeNodes()},t.Expr}(Tone_core_Tone,Tone_signal_Add,Tone_signal_Subtract,Tone_signal_Multiply,Tone_signal_IfThenElse,Tone_signal_OR,Tone_signal_AND,Tone_signal_NOT,Tone_signal_GreaterThan,Tone_signal_LessThan,Tone_signal_Equal,Tone_signal_EqualZero,Tone_signal_GreaterThanZero,Tone_signal_Abs,Tone_signal_Negate,Tone_signal_Max,Tone_signal_Min,Tone_signal_Modulo,Tone_signal_Pow);var Tone_signal_EqualPowerGain;Tone_signal_EqualPowerGain=function(t){"use strict";return t.EqualPowerGain=function(){this._eqPower=this.input=this.output=new t.WaveShaper(function(t){return Math.abs(t)<.001?0:this.equalPowerScale(t)}.bind(this),4096)},t.extend(t.EqualPowerGain,t.SignalBase),t.EqualPowerGain.prototype.dispose=function(){return t.prototype.dispose.call(this),this._eqPower.dispose(),this._eqPower=null,this},t.EqualPowerGain}(Tone_core_Tone);var Tone_component_CrossFade;Tone_component_CrossFade=function(t){"use strict";return t.CrossFade=function(e){t.call(this,2,1),this.a=this.input[0]=this.context.createGain(),this.b=this.input[1]=this.context.createGain(),this.fade=new t.Signal(this.defaultArg(e,.5),t.Type.NormalRange),this._equalPowerA=new t.EqualPowerGain,this._equalPowerB=new t.EqualPowerGain,this._invert=new t.Expr("1 - $0"),this.a.connect(this.output),this.b.connect(this.output),this.fade.chain(this._equalPowerB,this.b.gain),this.fade.chain(this._invert,this._equalPowerA,this.a.gain),this._readOnly("fade")},t.extend(t.CrossFade),t.CrossFade.prototype.dispose=function(){return t.prototype.dispose.call(this),this._writable("fade"),this._equalPowerA.dispose(),this._equalPowerA=null,this._equalPowerB.dispose(),this._equalPowerB=null,this.fade.dispose(),this.fade=null,this._invert.dispose(),this._invert=null,this.a.disconnect(),this.a=null,this.b.disconnect(),this.b=null,this},t.CrossFade}(Tone_core_Tone,Tone_signal_Signal,Tone_signal_Expr);var effect;effect=function(){var t=master,e=Tone_component_CrossFade;return p5.Effect=function(){this.ac=t.audiocontext,this.input=this.ac.createGain(),this.output=this.ac.createGain(),this._drywet=new e(1),this.wet=this.ac.createGain(),this.input.connect(this._drywet.a),this.wet.connect(this._drywet.b),this._drywet.connect(this.output),this.connect(),t.soundArray.push(this)},p5.Effect.prototype.amp=function(e,i,n){var i=i||0,n=n||0,o=t.audiocontext.currentTime,s=this.output.gain.value;this.output.gain.cancelScheduledValues(o),this.output.gain.linearRampToValueAtTime(s,o+n+.001),this.output.gain.linearRampToValueAtTime(e,o+n+i+.001)},p5.Effect.prototype.chain=function(){if(arguments.length>0){this.connect(arguments[0]);for(var t=1;t<arguments.length;t+=1)arguments[t-1].connect(arguments[t])}return this},p5.Effect.prototype.drywet=function(t){return"undefined"!=typeof t&&(this._drywet.fade.value=t),this._drywet.fade.value},p5.Effect.prototype.connect=function(t){var e=t||p5.soundOut.input;this.output.connect(e.input?e.input:e)},p5.Effect.prototype.disconnect=function(){this.output.disconnect()},p5.Effect.prototype.dispose=function(){var e=t.soundArray.indexOf(this);t.soundArray.splice(e,1),this.input.disconnect(),this.input=void 0,this.output.disconnect(),this.output=void 0,this._drywet.disconnect(),delete this._drywet,this.wet.disconnect(),delete this.wet,this.ac=void 0},p5.Effect}(master,Tone_component_CrossFade);var filter;filter=function(){var t=effect;return p5.Filter=function(e){t.call(this),this.biquad=this.ac.createBiquadFilter(),this.input.connect(this.biquad),this.biquad.connect(this.wet),e&&this.setType(e),this._on=!0,this._untoggledType=this.biquad.type},p5.Filter.prototype=Object.create(t.prototype),p5.Filter.prototype.process=function(t,e,i,n){t.connect(this.input),this.set(e,i,n)},p5.Filter.prototype.set=function(t,e,i){t&&this.freq(t,i),e&&this.res(e,i)},p5.Filter.prototype.freq=function(t,e){var i=e||0;return 0>=t&&(t=1),"number"==typeof t?(this.biquad.frequency.value=t,this.biquad.frequency.cancelScheduledValues(this.ac.currentTime+.01+i),this.biquad.frequency.exponentialRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.biquad.frequency),this.biquad.frequency.value},p5.Filter.prototype.res=function(t,e){var i=e||0;return"number"==typeof t?(this.biquad.Q.value=t,this.biquad.Q.cancelScheduledValues(this.ac.currentTime+.01+i),this.biquad.Q.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.biquad.Q),this.biquad.Q.value},p5.Filter.prototype.gain=function(t,e){var i=e||0;return"number"==typeof t?(this.biquad.gain.value=t,this.biquad.gain.cancelScheduledValues(this.ac.currentTime+.01+i),this.biquad.gain.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.biquad.gain),this.biquad.gain.value},p5.Filter.prototype.toggle=function(){return this._on=!this._on,this._on===!0?this.biquad.type=this._untoggledType:this._on===!1&&(this.biquad.type="allpass"),this._on},p5.Filter.prototype.setType=function(t){this.biquad.type=t,this._untoggledType=this.biquad.type},p5.Filter.prototype.dispose=function(){t.prototype.dispose.apply(this),this.biquad.disconnect(),this.biquad=void 0},p5.LowPass=function(){p5.Filter.call(this,"lowpass")},p5.LowPass.prototype=Object.create(p5.Filter.prototype),p5.HighPass=function(){p5.Filter.call(this,"highpass")},p5.HighPass.prototype=Object.create(p5.Filter.prototype),p5.BandPass=function(){p5.Filter.call(this,"bandpass")},p5.BandPass.prototype=Object.create(p5.Filter.prototype),p5.Filter}(master,effect);var src_eqFilter;src_eqFilter=function(){var t=filter,e=master,i=function(e,i){t.call(this,"peaking"),this.disconnect(),this.set(e,i),this.biquad.gain.value=0,delete this.input,delete this.output,delete this._drywet,delete this.wet};return i.prototype=Object.create(t.prototype),i.prototype.amp=function(){console.warn("`amp()` is not available for p5.EQ bands. Use `.gain()`")},i.prototype.drywet=function(){console.warn("`drywet()` is not available for p5.EQ bands.")},i.prototype.connect=function(t){var e=t||p5.soundOut.input;this.biquad?this.biquad.connect(e.input?e.input:e):this.output.connect(e.input?e.input:e)},i.prototype.disconnect=function(){this.biquad.disconnect()},i.prototype.dispose=function(){var t=e.soundArray.indexOf(this);e.soundArray.splice(t,1),this.disconnect(),delete this.biquad},i}(filter,master);var eq;eq=function(){var t=effect,e=src_eqFilter;return p5.EQ=function(e){t.call(this),e=3===e||8===e?e:3;var i;i=3===e?Math.pow(2,3):2,this.bands=[];for(var n,o,s=0;e>s;s++)s===e-1?(n=21e3,o=.01):0===s?(n=100,o=.1):1===s?(n=3===e?360*i:360,o=1):(n=this.bands[s-1].freq()*i,o=1),this.bands[s]=this._newBand(n,o),s>0?this.bands[s-1].connect(this.bands[s].biquad):this.input.connect(this.bands[s].biquad);this.bands[e-1].connect(this.output)},p5.EQ.prototype=Object.create(t.prototype),p5.EQ.prototype.process=function(t){t.connect(this.input)},p5.EQ.prototype.set=function(){if(arguments.length===2*this.bands.length)for(var t=0;t<arguments.length;t+=2)this.bands[t/2].freq(arguments[t]),this.bands[t/2].gain(arguments[t+1]);else console.error("Argument mismatch. .set() should be called with "+2*this.bands.length+" arguments. (one frequency and gain value pair for each band of the eq)")},p5.EQ.prototype._newBand=function(t,i){return new e(t,i)},p5.EQ.prototype.dispose=function(){for(t.prototype.dispose.apply(this);this.bands.length>0;)delete this.bands.pop().dispose();delete this.bands},p5.EQ}(effect,src_eqFilter);var panner3d;panner3d=function(){var t=effect;return p5.Panner3D=function(){t.call(this),this.panner=this.ac.createPanner(),this.panner.panningModel="HRTF",this.panner.distanceModel="linear",this.panner.connect(this.output),this.input.connect(this.panner)},p5.Panner3D.prototype=Object.create(t.prototype),p5.Panner3D.prototype.process=function(t){t.connect(this.input)},p5.Panner3D.prototype.set=function(t,e,i,n){return this.positionX(t,n),this.positionY(e,n),this.positionZ(i,n),[this.panner.positionX.value,this.panner.positionY.value,this.panner.positionZ.value]},p5.Panner3D.prototype.positionX=function(t,e){var i=e||0;return"number"==typeof t?(this.panner.positionX.value=t,this.panner.positionX.cancelScheduledValues(this.ac.currentTime+.01+i),this.panner.positionX.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.panner.positionX),this.panner.positionX.value},p5.Panner3D.prototype.positionY=function(t,e){var i=e||0;return"number"==typeof t?(this.panner.positionY.value=t,this.panner.positionY.cancelScheduledValues(this.ac.currentTime+.01+i),this.panner.positionY.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.panner.positionY),this.panner.positionY.value},p5.Panner3D.prototype.positionZ=function(t,e){var i=e||0;return"number"==typeof t?(this.panner.positionZ.value=t,this.panner.positionZ.cancelScheduledValues(this.ac.currentTime+.01+i),this.panner.positionZ.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.panner.positionZ),this.panner.positionZ.value},p5.Panner3D.prototype.orient=function(t,e,i,n){return this.orientX(t,n),this.orientY(e,n),this.orientZ(i,n),[this.panner.orientationX.value,this.panner.orientationY.value,this.panner.orientationZ.value]},p5.Panner3D.prototype.orientX=function(t,e){var i=e||0;return"number"==typeof t?(this.panner.orientationX.value=t,this.panner.orientationX.cancelScheduledValues(this.ac.currentTime+.01+i),this.panner.orientationX.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.panner.orientationX),this.panner.orientationX.value},p5.Panner3D.prototype.orientY=function(t,e){var i=e||0;return"number"==typeof t?(this.panner.orientationY.value=t,this.panner.orientationY.cancelScheduledValues(this.ac.currentTime+.01+i),this.panner.orientationY.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.panner.orientationY),this.panner.orientationY.value},p5.Panner3D.prototype.orientZ=function(t,e){var i=e||0;return"number"==typeof t?(this.panner.orientationZ.value=t,this.panner.orientationZ.cancelScheduledValues(this.ac.currentTime+.01+i),this.panner.orientationZ.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.panner.orientationZ),this.panner.orientationZ.value},p5.Panner3D.prototype.setFalloff=function(t,e){this.maxDist(t),this.rolloff(e)},p5.Panner3D.prototype.maxDist=function(t){return"number"==typeof t&&(this.panner.maxDistance=t),this.panner.maxDistance},p5.Panner3D.prototype.rolloff=function(t){return"number"==typeof t&&(this.panner.rolloffFactor=t),this.panner.rolloffFactor},p5.Panner3D.dispose=function(){t.prototype.dispose.apply(this),this.panner.disconnect(),delete this.panner},p5.Panner3D}(master,effect);var listener3d;listener3d=function(){var t=master;return p5.Listener3D=function(e){this.ac=t.audiocontext,this.listener=this.ac.listener},p5.Listener3D.prototype.process=function(t){t.connect(this.input)},p5.Listener3D.prototype.position=function(t,e,i,n){return this.positionX(t,n),this.positionY(e,n),this.positionZ(i,n),[this.listener.positionX.value,this.listener.positionY.value,this.listener.positionZ.value]},p5.Listener3D.prototype.positionX=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.positionX.value=t,this.listener.positionX.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.positionX.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.positionX),this.listener.positionX.value},p5.Listener3D.prototype.positionY=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.positionY.value=t,this.listener.positionY.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.positionY.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.positionY),this.listener.positionY.value},p5.Listener3D.prototype.positionZ=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.positionZ.value=t,this.listener.positionZ.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.positionZ.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.positionZ),this.listener.positionZ.value},p5.Listener3D.prototype.orient=function(t,e,i,n,o,s,r){return 3===arguments.length||4===arguments.length?(r=arguments[3],this.orientForward(t,e,i,r)):(6===arguments.length||7===arguments)&&(this.orientForward(t,e,i),this.orientUp(n,o,s,r)),[this.listener.forwardX.value,this.listener.forwardY.value,this.listener.forwardZ.value,this.listener.upX.value,this.listener.upY.value,this.listener.upZ.value]},p5.Listener3D.prototype.orientForward=function(t,e,i,n){return this.forwardX(t,n),this.forwardY(e,n),this.forwardZ(i,n),[this.listener.forwardX,this.listener.forwardY,this.listener.forwardZ]},p5.Listener3D.prototype.orientUp=function(t,e,i,n){return this.upX(t,n),this.upY(e,n),this.upZ(i,n),[this.listener.upX,this.listener.upY,this.listener.upZ]},p5.Listener3D.prototype.forwardX=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.forwardX.value=t,this.listener.forwardX.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.forwardX.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.forwardX),this.listener.forwardX.value},p5.Listener3D.prototype.forwardY=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.forwardY.value=t,this.listener.forwardY.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.forwardY.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.forwardY),this.listener.forwardY.value},p5.Listener3D.prototype.forwardZ=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.forwardZ.value=t,this.listener.forwardZ.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.forwardZ.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.forwardZ),this.listener.forwardZ.value},p5.Listener3D.prototype.upX=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.upX.value=t,this.listener.upX.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.upX.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.upX),this.listener.upX.value},p5.Listener3D.prototype.upY=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.upY.value=t,this.listener.upY.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.upY.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.upY),this.listener.upY.value},p5.Listener3D.prototype.upZ=function(t,e){var i=e||0;return"number"==typeof t?(this.listener.upZ.value=t,this.listener.upZ.cancelScheduledValues(this.ac.currentTime+.01+i),this.listener.upZ.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):t&&t.connect(this.listener.upZ),this.listener.upZ.value},p5.Listener3D}(master,effect);var delay;delay=function(){var t=filter,e=effect;p5.Delay=function(){e.call(this),this._split=this.ac.createChannelSplitter(2),this._merge=this.ac.createChannelMerger(2),this._leftGain=this.ac.createGain(),this._rightGain=this.ac.createGain(),this.leftDelay=this.ac.createDelay(),this.rightDelay=this.ac.createDelay(),this._leftFilter=new t,this._rightFilter=new t,this._leftFilter.disconnect(),this._rightFilter.disconnect(),this._leftFilter.biquad.frequency.setValueAtTime(1200,this.ac.currentTime),this._rightFilter.biquad.frequency.setValueAtTime(1200,this.ac.currentTime),this._leftFilter.biquad.Q.setValueAtTime(.3,this.ac.currentTime),this._rightFilter.biquad.Q.setValueAtTime(.3,this.ac.currentTime),this.input.connect(this._split),this.leftDelay.connect(this._leftGain),this.rightDelay.connect(this._rightGain),this._leftGain.connect(this._leftFilter.input),this._rightGain.connect(this._rightFilter.input),this._merge.connect(this.wet),this._leftFilter.biquad.gain.setValueAtTime(1,this.ac.currentTime),this._rightFilter.biquad.gain.setValueAtTime(1,this.ac.currentTime),this.setType(0),this._maxDelay=this.leftDelay.delayTime.maxValue,this.feedback(.5)},p5.Delay.prototype=Object.create(e.prototype),p5.Delay.prototype.process=function(t,e,i,n){var o=i||0,s=e||0;if(o>=1)throw new Error("Feedback value will force a positive feedback loop.");if(s>=this._maxDelay)throw new Error("Delay Time exceeds maximum delay time of "+this._maxDelay+" second.");t.connect(this.input),this.leftDelay.delayTime.setValueAtTime(s,this.ac.currentTime),this.rightDelay.delayTime.setValueAtTime(s,this.ac.currentTime),this._leftGain.gain.value=o,this._rightGain.gain.value=o,n&&(this._leftFilter.freq(n),this._rightFilter.freq(n))},p5.Delay.prototype.delayTime=function(t){"number"!=typeof t?(t.connect(this.leftDelay.delayTime),t.connect(this.rightDelay.delayTime)):(this.leftDelay.delayTime.cancelScheduledValues(this.ac.currentTime),this.rightDelay.delayTime.cancelScheduledValues(this.ac.currentTime),this.leftDelay.delayTime.linearRampToValueAtTime(t,this.ac.currentTime),this.rightDelay.delayTime.linearRampToValueAtTime(t,this.ac.currentTime))},p5.Delay.prototype.feedback=function(t){if(t&&"number"!=typeof t)t.connect(this._leftGain.gain),t.connect(this._rightGain.gain);else{if(t>=1)throw new Error("Feedback value will force a positive feedback loop.");"number"==typeof t&&(this._leftGain.gain.value=t,this._rightGain.gain.value=t)}return this._leftGain.gain.value},p5.Delay.prototype.filter=function(t,e){this._leftFilter.set(t,e),this._rightFilter.set(t,e)},p5.Delay.prototype.setType=function(t){switch(1===t&&(t="pingPong"),this._split.disconnect(),this._leftFilter.disconnect(),this._rightFilter.disconnect(),this._split.connect(this.leftDelay,0),this._split.connect(this.rightDelay,1),t){case"pingPong":this._rightFilter.setType(this._leftFilter.biquad.type),this._leftFilter.output.connect(this._merge,0,0),this._rightFilter.output.connect(this._merge,0,1),this._leftFilter.output.connect(this.rightDelay),this._rightFilter.output.connect(this.leftDelay);break;default:this._leftFilter.output.connect(this._merge,0,0),this._rightFilter.output.connect(this._merge,0,1),this._leftFilter.output.connect(this.leftDelay),this._rightFilter.output.connect(this.rightDelay)}},p5.Delay.prototype.dispose=function(){e.prototype.dispose.apply(this),this._split.disconnect(),this._leftFilter.dispose(),this._rightFilter.dispose(),this._merge.disconnect(),this._leftGain.disconnect(),this._rightGain.disconnect(),this.leftDelay.disconnect(),this.rightDelay.disconnect(),this._split=void 0,this._leftFilter=void 0,this._rightFilter=void 0,this._merge=void 0,this._leftGain=void 0,this._rightGain=void 0,this.leftDelay=void 0,this.rightDelay=void 0}}(filter,effect);var reverb;reverb=function(){var t=errorHandler,e=effect;p5.Reverb=function(){e.call(this),this.convolverNode=this.ac.createConvolver(),this.input.gain.value=.5,this.input.connect(this.convolverNode),this.convolverNode.connect(this.wet),this._seconds=3,this._decay=2,this._reverse=!1,this._buildImpulse()},p5.Reverb.prototype=Object.create(e.prototype),p5.Reverb.prototype.process=function(t,e,i,n){t.connect(this.input);var o=!1;e&&(this._seconds=e,o=!0),i&&(this._decay=i),n&&(this._reverse=n),o&&this._buildImpulse()},p5.Reverb.prototype.set=function(t,e,i){var n=!1;t&&(this._seconds=t,n=!0),e&&(this._decay=e),i&&(this._reverse=i),n&&this._buildImpulse()},p5.Reverb.prototype._buildImpulse=function(){var t,e,i=this.ac.sampleRate,n=i*this._seconds,o=this._decay,s=this.ac.createBuffer(2,n,i),r=s.getChannelData(0),a=s.getChannelData(1);for(e=0;n>e;e++)t=this._reverse?n-e:e,r[e]=(2*Math.random()-1)*Math.pow(1-t/n,o),a[e]=(2*Math.random()-1)*Math.pow(1-t/n,o);this.convolverNode.buffer=s},p5.Reverb.prototype.dispose=function(){e.prototype.dispose.apply(this),this.convolverNode&&(this.convolverNode.buffer=null,this.convolverNode=null)},p5.Convolver=function(t,i,n){e.call(this),this.convolverNode=this.ac.createConvolver(),this.input.gain.value=.5,this.input.connect(this.convolverNode),this.convolverNode.connect(this.wet),t?(this.impulses=[],this._loadBuffer(t,i,n)):(this._seconds=3,this._decay=2,this._reverse=!1,this._buildImpulse())},p5.Convolver.prototype=Object.create(p5.Reverb.prototype),p5.prototype.registerPreloadMethod("createConvolver",p5.prototype),p5.prototype.createConvolver=function(t,e,i){window.location.origin.indexOf("file://")>-1&&"undefined"===window.cordova&&alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");var n=new p5.Convolver(t,e,i);return n.impulses=[],n},p5.Convolver.prototype._loadBuffer=function(e,i,n){var e=p5.prototype._checkFileFormats(e),o=this,s=(new Error).stack,r=p5.prototype.getAudioContext(),a=new XMLHttpRequest;a.open("GET",e,!0),a.responseType="arraybuffer",a.onload=function(){if(200===a.status)r.decodeAudioData(a.response,function(t){var n={},s=e.split("/");n.name=s[s.length-1],n.audioBuffer=t,o.impulses.push(n),o.convolverNode.buffer=n.audioBuffer,i&&i(n)},function(){var e=new t("decodeAudioData",s,o.url),i="AudioContext error at decodeAudioData for "+o.url;n?(e.msg=i,n(e)):console.error(i+"\n The error stack trace includes: \n"+e.stack)});else{var u=new t("loadConvolver",s,o.url),p="Unable to load "+o.url+". The request status was: "+a.status+" ("+a.statusText+")";n?(u.message=p,n(u)):console.error(p+"\n The error stack trace includes: \n"+u.stack)}},a.onerror=function(){var e=new t("loadConvolver",s,o.url),i="There was no response from the server at "+o.url+". Check the url and internet connectivity.";n?(e.message=i,n(e)):console.error(i+"\n The error stack trace includes: \n"+e.stack)},a.send()},p5.Convolver.prototype.set=null,p5.Convolver.prototype.process=function(t){t.connect(this.input)},p5.Convolver.prototype.impulses=[],p5.Convolver.prototype.addImpulse=function(t,e,i){window.location.origin.indexOf("file://")>-1&&"undefined"===window.cordova&&alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS"),this._loadBuffer(t,e,i)},p5.Convolver.prototype.resetImpulse=function(t,e,i){window.location.origin.indexOf("file://")>-1&&"undefined"===window.cordova&&alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS"),this.impulses=[],this._loadBuffer(t,e,i)},p5.Convolver.prototype.toggleImpulse=function(t){if("number"==typeof t&&t<this.impulses.length&&(this.convolverNode.buffer=this.impulses[t].audioBuffer),"string"==typeof t)for(var e=0;e<this.impulses.length;e++)if(this.impulses[e].name===t){this.convolverNode.buffer=this.impulses[e].audioBuffer;break}},p5.Convolver.prototype.dispose=function(){e.prototype.dispose.apply(this);for(var t in this.impulses)this.impulses[t]&&(this.impulses[t]=null);this.convolverNode.disconnect(),this.concolverNode=null}}(errorHandler,effect,sndcore);var Tone_core_TimelineState;Tone_core_TimelineState=function(t){"use strict";return t.TimelineState=function(e){t.Timeline.call(this),this._initial=e},t.extend(t.TimelineState,t.Timeline),t.TimelineState.prototype.getStateAtTime=function(t){var e=this.getEvent(t);return null!==e?e.state:this._initial},t.TimelineState.prototype.setStateAtTime=function(t,e){this.addEvent({state:t,time:this.toSeconds(e)})},t.TimelineState}(Tone_core_Tone,Tone_core_Timeline);var Tone_core_Clock;Tone_core_Clock=function(t){"use strict";return t.Clock=function(){var e=this.optionsObject(arguments,["callback","frequency"],t.Clock.defaults);this.callback=e.callback,this._lookAhead="auto",this._computedLookAhead=1/60,this._threshold=.5,this._nextTick=-1,this._lastUpdate=0,this._loopID=-1,this.frequency=new t.TimelineSignal(e.frequency,t.Type.Frequency),this.ticks=0,this._state=new t.TimelineState(t.State.Stopped),this._boundLoop=this._loop.bind(this),this._readOnly("frequency"),this._loop()},t.extend(t.Clock),t.Clock.defaults={callback:t.noOp,frequency:1,lookAhead:"auto"},Object.defineProperty(t.Clock.prototype,"state",{get:function(){return this._state.getStateAtTime(this.now())}}),Object.defineProperty(t.Clock.prototype,"lookAhead",{get:function(){return this._lookAhead},set:function(t){"auto"===t?this._lookAhead="auto":this._lookAhead=this.toSeconds(t)}}),t.Clock.prototype.start=function(e,i){return e=this.toSeconds(e),this._state.getStateAtTime(e)!==t.State.Started&&this._state.addEvent({state:t.State.Started,time:e,offset:i}),this},t.Clock.prototype.stop=function(e){return e=this.toSeconds(e),this._state.getStateAtTime(e)!==t.State.Stopped&&this._state.setStateAtTime(t.State.Stopped,e),this},t.Clock.prototype.pause=function(e){return e=this.toSeconds(e),this._state.getStateAtTime(e)===t.State.Started&&this._state.setStateAtTime(t.State.Paused,e),this},t.Clock.prototype._loop=function(e){if(this._loopID=requestAnimationFrame(this._boundLoop),"auto"===this._lookAhead){if(!this.isUndef(e)){var i=(e-this._lastUpdate)/1e3;this._lastUpdate=e,i<this._threshold&&(this._computedLookAhead=(9*this._computedLookAhead+i)/10)}}else this._computedLookAhead=this._lookAhead;var n=this.now(),o=2*this._computedLookAhead,s=this._state.getEvent(n+o),r=t.State.Stopped;if(s&&(r=s.state,-1===this._nextTick&&r===t.State.Started&&(this._nextTick=s.time,this.isUndef(s.offset)||(this.ticks=s.offset))),r===t.State.Started)for(;n+o>this._nextTick;){n>this._nextTick+this._threshold&&(this._nextTick=n);var a=this._nextTick;this._nextTick+=1/this.frequency.getValueAtTime(this._nextTick),this.callback(a),this.ticks++}else r===t.State.Stopped&&(this._nextTick=-1,this.ticks=0)},t.Clock.prototype.getStateAtTime=function(t){return this._state.getStateAtTime(t)},t.Clock.prototype.dispose=function(){cancelAnimationFrame(this._loopID),t.TimelineState.prototype.dispose.call(this),this._writable("frequency"),this.frequency.dispose(),this.frequency=null,this._boundLoop=t.noOp,this._nextTick=1/0,this.callback=null,this._state.dispose(),this._state=null},t.Clock}(Tone_core_Tone,Tone_signal_TimelineSignal);var metro;metro=function(){var t=master,e=Tone_core_Clock;p5.Metro=function(){this.clock=new e({callback:this.ontick.bind(this)}),this.syncedParts=[],this.bpm=120,this._init(),this.prevTick=0,this.tatumTime=0,this.tickCallback=function(){}},p5.Metro.prototype.ontick=function(e){var i=e-this.prevTick,n=e-t.audiocontext.currentTime;if(!(i-this.tatumTime<=-.02)){this.prevTick=e;var o=this;this.syncedParts.forEach(function(t){t.isPlaying&&(t.incrementStep(n),t.phrases.forEach(function(t){var e=t.sequence,i=o.metroTicks%e.length;0!==e[i]&&(o.metroTicks<e.length||!t.looping)&&t.callback(n,e[i])}))}),this.metroTicks+=1,this.tickCallback(n)}},p5.Metro.prototype.setBPM=function(e,i){var n=60/(e*this.tatums),o=t.audiocontext.currentTime;this.tatumTime=n;var i=i||0;this.clock.frequency.setValueAtTime(this.clock.frequency.value,o),this.clock.frequency.linearRampToValueAtTime(e,o+i),this.bpm=e},p5.Metro.prototype.getBPM=function(){return this.clock.getRate()/this.tatums*60},p5.Metro.prototype._init=function(){this.metroTicks=0},p5.Metro.prototype.resetSync=function(t){this.syncedParts=[t]},p5.Metro.prototype.pushSync=function(t){this.syncedParts.push(t)},p5.Metro.prototype.start=function(e){var i=e||0,n=t.audiocontext.currentTime;this.clock.start(n+i),this.setBPM(this.bpm)},p5.Metro.prototype.stop=function(e){var i=e||0,n=t.audiocontext.currentTime;this.clock.stop(n+i)},p5.Metro.prototype.beatLength=function(t){this.tatums=1/t/4}}(master,Tone_core_Clock);var looper;looper=function(){function t(t){t.currentPart++,t.currentPart>=t.parts.length?(t.scoreStep=0,t.onended()):(t.scoreStep=0,t.parts[t.currentPart-1].stop(),t.parts[t.currentPart].start())}var e=master,i=120;p5.prototype.setBPM=function(t,n){i=t;for(var o in e.parts)e.parts[o]&&e.parts[o].setBPM(t,n)},p5.Phrase=function(t,e,i){this.phraseStep=0,this.name=t,this.callback=e,this.sequence=i},p5.Part=function(t,n){this.length=t||0,this.partStep=0,this.phrases=[],this.isPlaying=!1,this.noLoop(),this.tatums=n||.0625,this.metro=new p5.Metro,this.metro._init(),this.metro.beatLength(this.tatums),this.metro.setBPM(i),e.parts.push(this),this.callback=function(){}},p5.Part.prototype.setBPM=function(t,e){this.metro.setBPM(t,e)},p5.Part.prototype.getBPM=function(){return this.metro.getBPM()},p5.Part.prototype.start=function(t){if(!this.isPlaying){this.isPlaying=!0,this.metro.resetSync(this);var e=t||0;this.metro.start(e)}},p5.Part.prototype.loop=function(t){this.looping=!0,this.onended=function(){this.partStep=0};var e=t||0;this.start(e)},p5.Part.prototype.noLoop=function(){this.looping=!1,this.onended=function(){this.stop()}},p5.Part.prototype.stop=function(t){this.partStep=0,this.pause(t)},p5.Part.prototype.pause=function(t){this.isPlaying=!1;var e=t||0;this.metro.stop(e)},p5.Part.prototype.addPhrase=function(t,e,i){var n;if(3===arguments.length)n=new p5.Phrase(t,e,i);else{if(!(arguments[0]instanceof p5.Phrase))throw"invalid input. addPhrase accepts name, callback, array or a p5.Phrase";n=arguments[0]}this.phrases.push(n),n.sequence.length>this.length&&(this.length=n.sequence.length)},p5.Part.prototype.removePhrase=function(t){for(var e in this.phrases)this.phrases[e].name===t&&this.phrases.splice(e,1)},p5.Part.prototype.getPhrase=function(t){for(var e in this.phrases)if(this.phrases[e].name===t)return this.phrases[e]},p5.Part.prototype.replaceSequence=function(t,e){for(var i in this.phrases)this.phrases[i].name===t&&(this.phrases[i].sequence=e)},p5.Part.prototype.incrementStep=function(t){this.partStep<this.length-1?(this.callback(t),this.partStep+=1):this.looping||this.partStep!==this.length-1||(console.log("done"),this.onended())},p5.Part.prototype.onStep=function(t){this.callback=t},p5.Score=function(){this.parts=[],this.currentPart=0;var e=this;for(var i in arguments)arguments[i]&&this.parts[i]&&(this.parts[i]=arguments[i],this.parts[i].nextPart=this.parts[i+1],this.parts[i].onended=function(){e.resetPart(i),t(e)});this.looping=!1},p5.Score.prototype.onended=function(){this.looping?this.parts[0].start():this.parts[this.parts.length-1].onended=function(){this.stop(),this.resetParts()},this.currentPart=0},p5.Score.prototype.start=function(){this.parts[this.currentPart].start(),this.scoreStep=0},p5.Score.prototype.stop=function(){this.parts[this.currentPart].stop(),this.currentPart=0,this.scoreStep=0},p5.Score.prototype.pause=function(){this.parts[this.currentPart].stop()},p5.Score.prototype.loop=function(){this.looping=!0,this.start()},p5.Score.prototype.noLoop=function(){this.looping=!1},p5.Score.prototype.resetParts=function(){var t=this;this.parts.forEach(function(e){t.resetParts[e]})},p5.Score.prototype.resetPart=function(t){this.parts[t].stop(),this.parts[t].partStep=0;for(var e in this.parts[t].phrases)this.parts[t]&&(this.parts[t].phrases[e].phraseStep=0)},p5.Score.prototype.setBPM=function(t,e){for(var i in this.parts)this.parts[i]&&this.parts[i].setBPM(t,e)}}(master);var soundloop;soundloop=function(){var t=master,e=Tone_core_Clock;return p5.SoundLoop=function(i,n){this.callback=i,this.musicalTimeMode="number"==typeof this._interval?!1:!0,this._interval=n||1,this._timeSignature=4,this._bpm=60,this.isPlaying=!1,this.maxIterations=1/0;var o=this;this.clock=new e({callback:function(e){var i=e-t.audiocontext.currentTime;i>0&&o.iterations<=o.maxIterations&&o.callback(i)},frequency:this._calcFreq()})},p5.SoundLoop.prototype.start=function(e){var i=e||0,n=t.audiocontext.currentTime;this.isPlaying||(this.clock.start(n+i),this.isPlaying=!0)},p5.SoundLoop.prototype.stop=function(e){var i=e||0,n=t.audiocontext.currentTime;this.isPlaying&&(this.clock.stop(n+i),this.isPlaying=!1)},
p5.SoundLoop.prototype.pause=function(t){var e=t||0;this.isPlaying&&(this.clock.pause(e),this.isPlaying=!1)},p5.SoundLoop.prototype.syncedStart=function(e,i){var n=i||0,o=t.audiocontext.currentTime;if(e.isPlaying){if(e.isPlaying){var s=e.clock._nextTick-t.audiocontext.currentTime;this.clock.start(o+s),this.isPlaying=!0}}else e.clock.start(o+n),e.isPlaying=!0,this.clock.start(o+n),this.isPlaying=!0},p5.SoundLoop.prototype._update=function(){this.clock.frequency.value=this._calcFreq()},p5.SoundLoop.prototype._calcFreq=function(){return"number"==typeof this._interval?(this.musicalTimeMode=!1,1/this._interval):"string"==typeof this._interval?(this.musicalTimeMode=!0,this._bpm/60/this._convertNotation(this._interval)*(this._timeSignature/4)):void 0},p5.SoundLoop.prototype._convertNotation=function(t){var e=t.slice(-1);switch(t=Number(t.slice(0,-1)),e){case"m":return this._measure(t);case"n":return this._note(t);default:console.warn("Specified interval is not formatted correctly. See Tone.js timing reference for more info: https://github.com/Tonejs/Tone.js/wiki/Time")}},p5.SoundLoop.prototype._measure=function(t){return t*this._timeSignature},p5.SoundLoop.prototype._note=function(t){return this._timeSignature/t},Object.defineProperty(p5.SoundLoop.prototype,"bpm",{get:function(){return this._bpm},set:function(t){this.musicalTimeMode||console.warn('Changing the BPM in "seconds" mode has no effect. BPM is only relevant in musicalTimeMode when the interval is specified as a string ("2n", "4n", "1m"...etc)'),this._bpm=t,this._update()}}),Object.defineProperty(p5.SoundLoop.prototype,"timeSignature",{get:function(){return this._timeSignature},set:function(t){this.musicalTimeMode||console.warn('Changing the timeSignature in "seconds" mode has no effect. BPM is only relevant in musicalTimeMode when the interval is specified as a string ("2n", "4n", "1m"...etc)'),this._timeSignature=t,this._update()}}),Object.defineProperty(p5.SoundLoop.prototype,"interval",{get:function(){return this._interval},set:function(t){this.musicalTimeMode="Number"==typeof t?!1:!0,this._interval=t,this._update()}}),Object.defineProperty(p5.SoundLoop.prototype,"iterations",{get:function(){return this.clock.ticks}}),p5.SoundLoop}(master,Tone_core_Clock);var compressor;compressor=function(){"use strict";var t=effect;return p5.Compressor=function(){t.call(this),this.compressor=this.ac.createDynamicsCompressor(),this.input.connect(this.compressor),this.compressor.connect(this.wet)},p5.Compressor.prototype=Object.create(t.prototype),p5.Compressor.prototype.process=function(t,e,i,n,o,s){t.connect(this.input),this.set(e,i,n,o,s)},p5.Compressor.prototype.set=function(t,e,i,n,o){"undefined"!=typeof t&&this.attack(t),"undefined"!=typeof e&&this.knee(e),"undefined"!=typeof i&&this.ratio(i),"undefined"!=typeof n&&this.threshold(n),"undefined"!=typeof o&&this.release(o)},p5.Compressor.prototype.attack=function(t,e){var i=e||0;return"number"==typeof t?(this.compressor.attack.value=t,this.compressor.attack.cancelScheduledValues(this.ac.currentTime+.01+i),this.compressor.attack.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):"undefined"!=typeof t&&t.connect(this.compressor.attack),this.compressor.attack.value},p5.Compressor.prototype.knee=function(t,e){var i=e||0;return"number"==typeof t?(this.compressor.knee.value=t,this.compressor.knee.cancelScheduledValues(this.ac.currentTime+.01+i),this.compressor.knee.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):"undefined"!=typeof t&&t.connect(this.compressor.knee),this.compressor.knee.value},p5.Compressor.prototype.ratio=function(t,e){var i=e||0;return"number"==typeof t?(this.compressor.ratio.value=t,this.compressor.ratio.cancelScheduledValues(this.ac.currentTime+.01+i),this.compressor.ratio.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):"undefined"!=typeof t&&t.connect(this.compressor.ratio),this.compressor.ratio.value},p5.Compressor.prototype.threshold=function(t,e){var i=e||0;return"number"==typeof t?(this.compressor.threshold.value=t,this.compressor.threshold.cancelScheduledValues(this.ac.currentTime+.01+i),this.compressor.threshold.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):"undefined"!=typeof t&&t.connect(this.compressor.threshold),this.compressor.threshold.value},p5.Compressor.prototype.release=function(t,e){var i=e||0;return"number"==typeof t?(this.compressor.release.value=t,this.compressor.release.cancelScheduledValues(this.ac.currentTime+.01+i),this.compressor.release.linearRampToValueAtTime(t,this.ac.currentTime+.02+i)):"undefined"!=typeof number&&t.connect(this.compressor.release),this.compressor.release.value},p5.Compressor.prototype.reduction=function(){return this.compressor.reduction.value},p5.Compressor.prototype.dispose=function(){t.prototype.dispose.apply(this),this.compressor.disconnect(),this.compressor=void 0},p5.Compressor}(master,effect,errorHandler);var soundRecorder;soundRecorder=function(){function t(t,e){for(var i=t.length+e.length,n=new Float32Array(i),o=0,s=0;i>s;)n[s++]=t[o],n[s++]=e[o],o++;return n}function e(t,e,i){for(var n=i.length,o=0;n>o;o++)t.setUint8(e+o,i.charCodeAt(o))}var i=master,n=i.audiocontext;p5.SoundRecorder=function(){this.input=n.createGain(),this.output=n.createGain(),this.recording=!1,this.bufferSize=1024,this._channels=2,this._clear(),this._jsNode=n.createScriptProcessor(this.bufferSize,this._channels,2),this._jsNode.onaudioprocess=this._audioprocess.bind(this),this._callback=function(){},this._jsNode.connect(p5.soundOut._silentNode),this.setInput(),i.soundArray.push(this)},p5.SoundRecorder.prototype.setInput=function(t){this.input.disconnect(),this.input=null,this.input=n.createGain(),this.input.connect(this._jsNode),this.input.connect(this.output),t?t.connect(this.input):p5.soundOut.output.connect(this.input)},p5.SoundRecorder.prototype.record=function(t,e,i){this.recording=!0,e&&(this.sampleLimit=Math.round(e*n.sampleRate)),t&&i?this._callback=function(){this.buffer=this._getBuffer(),t.setBuffer(this.buffer),i()}:t&&(this._callback=function(){this.buffer=this._getBuffer(),t.setBuffer(this.buffer)})},p5.SoundRecorder.prototype.stop=function(){this.recording=!1,this._callback(),this._clear()},p5.SoundRecorder.prototype._clear=function(){this._leftBuffers=[],this._rightBuffers=[],this.recordedSamples=0,this.sampleLimit=null},p5.SoundRecorder.prototype._audioprocess=function(t){if(this.recording!==!1&&this.recording===!0)if(this.sampleLimit&&this.recordedSamples>=this.sampleLimit)this.stop();else{var e=t.inputBuffer.getChannelData(0),i=t.inputBuffer.getChannelData(1);this._leftBuffers.push(new Float32Array(e)),this._rightBuffers.push(new Float32Array(i)),this.recordedSamples+=this.bufferSize}},p5.SoundRecorder.prototype._getBuffer=function(){var t=[];return t.push(this._mergeBuffers(this._leftBuffers)),t.push(this._mergeBuffers(this._rightBuffers)),t},p5.SoundRecorder.prototype._mergeBuffers=function(t){for(var e=new Float32Array(this.recordedSamples),i=0,n=t.length,o=0;n>o;o++){var s=t[o];e.set(s,i),i+=s.length}return e},p5.SoundRecorder.prototype.dispose=function(){this._clear();var t=i.soundArray.indexOf(this);i.soundArray.splice(t,1),this._callback=function(){},this.input&&this.input.disconnect(),this.input=null,this._jsNode=null},p5.prototype.saveSound=function(i,n){var o,s;o=i.buffer.getChannelData(0),s=i.buffer.numberOfChannels>1?i.buffer.getChannelData(1):o;var r=t(o,s),a=new window.ArrayBuffer(44+2*r.length),u=new window.DataView(a);e(u,0,"RIFF"),u.setUint32(4,36+2*r.length,!0),e(u,8,"WAVE"),e(u,12,"fmt "),u.setUint32(16,16,!0),u.setUint16(20,1,!0),u.setUint16(22,2,!0),u.setUint32(24,44100,!0),u.setUint32(28,176400,!0),u.setUint16(32,4,!0),u.setUint16(34,16,!0),e(u,36,"data"),u.setUint32(40,2*r.length,!0);for(var p=r.length,c=44,h=1,l=0;p>l;l++)u.setInt16(c,r[l]*(32767*h),!0),c+=2;p5.prototype.writeFile([u],n,"wav")}}(sndcore,master);var peakdetect;peakdetect=function(){p5.PeakDetect=function(t,e,i,n){this.framesPerPeak=n||20,this.framesSinceLastPeak=0,this.decayRate=.95,this.threshold=i||.35,this.cutoff=0,this.cutoffMult=1.5,this.energy=0,this.penergy=0,this.currentValue=0,this.isDetected=!1,this.f1=t||40,this.f2=e||2e4,this._onPeak=function(){}},p5.PeakDetect.prototype.update=function(t){var e=this.energy=t.getEnergy(this.f1,this.f2)/255;e>this.cutoff&&e>this.threshold&&e-this.penergy>0?(this._onPeak(),this.isDetected=!0,this.cutoff=e*this.cutoffMult,this.framesSinceLastPeak=0):(this.isDetected=!1,this.framesSinceLastPeak<=this.framesPerPeak?this.framesSinceLastPeak++:(this.cutoff*=this.decayRate,this.cutoff=Math.max(this.cutoff,this.threshold))),this.currentValue=e,this.penergy=e},p5.PeakDetect.prototype.onPeak=function(t,e){var i=this;i._onPeak=function(){t(i.energy,e)}}}();var gain;gain=function(){var t=master;p5.Gain=function(){this.ac=t.audiocontext,this.input=this.ac.createGain(),this.output=this.ac.createGain(),this.input.gain.value=.5,this.input.connect(this.output),t.soundArray.push(this)},p5.Gain.prototype.setInput=function(t){t.connect(this.input)},p5.Gain.prototype.connect=function(t){var e=t||p5.soundOut.input;this.output.connect(e.input?e.input:e)},p5.Gain.prototype.disconnect=function(){this.output.disconnect()},p5.Gain.prototype.amp=function(e,i,n){var i=i||0,n=n||0,o=t.audiocontext.currentTime,s=this.output.gain.value;this.output.gain.cancelScheduledValues(o),this.output.gain.linearRampToValueAtTime(s,o+n),this.output.gain.linearRampToValueAtTime(e,o+n+i)},p5.Gain.prototype.dispose=function(){var e=t.soundArray.indexOf(this);t.soundArray.splice(e,1),this.output.disconnect(),this.input.disconnect(),this.output=void 0,this.input=void 0}}(master,sndcore);var audioVoice;audioVoice=function(){var t=master;return p5.AudioVoice=function(){this.ac=t.audiocontext,this.output=this.ac.createGain(),this.connect(),t.soundArray.push(this)},p5.AudioVoice.prototype._setNote=function(t){var e={A:21,B:23,C:24,D:26,E:28,F:29,G:31},i=e[t[0]],n="number"==typeof Number(t.slice(-1))?t.slice(-1):0;return i+=12*n,i="#"===t[1]?i+1:"b"===t[1]?i-1:i,p5.prototype.midiToFreq(i)},p5.AudioVoice.prototype.play=function(t,e,i,n){},p5.AudioVoice.prototype.triggerAttack=function(t,e,i){},p5.AudioVoice.prototype.triggerRelease=function(t){},p5.AudioVoice.prototype.amp=function(t,e){},p5.AudioVoice.prototype.connect=function(e){var i=e||t.input;this.output.connect(i.input?i.input:i)},p5.AudioVoice.prototype.disconnect=function(){this.output.disconnect()},p5.AudioVoice.prototype.dispose=function(){this.output.disconnect(),delete this.output},p5.AudioVoice}(master);var monosynth;monosynth=function(){var t=master,e=audioVoice;p5.MonoSynth=function(){e.call(this),this.oscillator=new p5.Oscillator,this.env=new p5.Env,this.env.setRange(1,0),this.env.setExp(!0),this.setADSR(.02,.25,.05,.35),this.filter=new p5.Filter("highpass"),this.filter.set(5,1),this.oscillator.disconnect(),this.oscillator.connect(this.filter),this.env.disconnect(),this.env.setInput(this.oscillator),this.filter.connect(this.output),this.oscillator.start(),this.connect(),this._isOn=!1,t.soundArray.push(this)},p5.MonoSynth.prototype=Object.create(p5.AudioVoice.prototype),p5.MonoSynth.prototype.play=function(t,e,i,n){var n=n||this.sustain;this.susTime=n,this.triggerAttack(t,e,i),this.triggerRelease(i+n)},p5.MonoSynth.prototype.triggerAttack=function(t,e,i){var i=i||0,n="string"==typeof t?this._setNote(t):"number"==typeof t?t:440,o=e||1;this._isOn=!0,this.oscillator.freq(n,0,i),this.env.ramp(this.output,i,o)},p5.MonoSynth.prototype.triggerRelease=function(t){var t=t||0;this.env.ramp(this.output,t,0),this._isOn=!1},p5.MonoSynth.prototype.setADSR=function(t,e,i,n){this.env.setADSR(t,e,i,n)},Object.defineProperties(p5.MonoSynth.prototype,{attack:{get:function(){return this.env.aTime},set:function(t){this.env.setADSR(t,this.env.dTime,this.env.sPercent,this.env.rTime)}},decay:{get:function(){return this.env.dTime},set:function(t){this.env.setADSR(this.env.aTime,t,this.env.sPercent,this.env.rTime)}},sustain:{get:function(){return this.env.sPercent},set:function(t){this.env.setADSR(this.env.aTime,this.env.dTime,t,this.env.rTime)}},release:{get:function(){return this.env.rTime},set:function(t){this.env.setADSR(this.env.aTime,this.env.dTime,this.env.sPercent,t)}}}),p5.MonoSynth.prototype.amp=function(t,e){var i=e||0;return"undefined"!=typeof t&&this.oscillator.amp(t,i),this.oscillator.amp().value},p5.MonoSynth.prototype.connect=function(e){var i=e||t.input;this.output.connect(i.input?i.input:i)},p5.MonoSynth.prototype.disconnect=function(){this.output.disconnect()},p5.MonoSynth.prototype.dispose=function(){e.prototype.dispose.apply(this),this.filter.dispose(),this.env.dispose();try{this.oscillator.dispose()}catch(t){console.error("mono synth default oscillator already disposed")}}}(master,audioVoice);var polysynth;polysynth=function(){var t=master,e=Tone_signal_TimelineSignal;p5.PolySynth=function(i,n){this.audiovoices=[],this.notes={},this._newest=0,this._oldest=0,this.polyValue=n||8,this.AudioVoice=void 0===i?p5.MonoSynth:i,this._voicesInUse=new e(0),this.output=t.audiocontext.createGain(),this.connect(),this._allocateVoices(),t.soundArray.push(this)},p5.PolySynth.prototype._allocateVoices=function(){for(var t=0;t<this.polyValue;t++)this.audiovoices.push(new this.AudioVoice),this.audiovoices[t].disconnect(),this.audiovoices[t].connect(this.output)},p5.PolySynth.prototype.play=function(t,e,i,n){var n=n||1;this.noteAttack(t,e,i),this.noteRelease(t,i+n)},p5.PolySynth.prototype.noteADSR=function(e,i,n,o,s,r){var a=t.audiocontext.currentTime,r=r||0,u=a+r;this.audiovoices[this.notes[e].getValueAtTime(u)].setADSR(i,n,o,s)},p5.PolySynth.prototype.setADSR=function(t,e,i,n){this.audiovoices.forEach(function(o){o.setADSR(t,e,i,n)})},p5.PolySynth.prototype.noteAttack=function(i,n,o){var s,r=t.audiocontext.currentTime,a=o||0,u=r+a,p="string"==typeof i?this.AudioVoice.prototype._setNote(i):"number"==typeof i?i:440,c=void 0===n?1:n;if(void 0!==this.notes[p]&&null!==this.notes[p].getValueAtTime(u)&&this.noteRelease(p,0),this._voicesInUse.getValueAtTime(u)<this.polyValue)s=this._voicesInUse.getValueAtTime(u);else{s=this._oldest;var h=p5.prototype.freqToMidi(this.audiovoices[this._oldest].oscillator.freq().value);this.noteRelease(h),this._oldest=(this._oldest+1)%(this.polyValue-1)}this.notes[p]=new e,this.notes[p].setValueAtTime(s,u);var l=null===this._voicesInUse._searchBefore(u)?0:this._voicesInUse._searchBefore(u).value;if(this._voicesInUse.setValueAtTime(l+1,u),this._updateAfter(u,1),this._newest=s,"number"==typeof c){var d=1/this._voicesInUse.getValueAtTime(u)*2;c=c>d?d:c}this.audiovoices[s].triggerAttack(p,c,a)},p5.PolySynth.prototype._updateAfter=function(t,e){if(null!==this._voicesInUse._searchAfter(t)){this._voicesInUse._searchAfter(t).value+=e;var i=this._voicesInUse._searchAfter(t).time;this._updateAfter(i,e)}},p5.PolySynth.prototype.noteRelease=function(e,i){var n="string"==typeof e?this.AudioVoice.prototype._setNote(e):"number"==typeof e?e:this.audiovoices[this._newest].oscillator.freq().value,o=t.audiocontext.currentTime,s=i||0,r=o+s;if(null===this.notes[n].getValueAtTime(r))console.warn("Cannot release a note that is not already playing");else{var a=null===this._voicesInUse._searchBefore(r)?0:this._voicesInUse._searchBefore(r).value;this._voicesInUse.setValueAtTime(a-1,r),this._updateAfter(r,-1),this.audiovoices[this.notes[n].getValueAtTime(r)].triggerRelease(s),this.notes[n].setValueAtTime(null,r),this._newest=0===this._newest?0:(this._newest-1)%(this.polyValue-1)}},p5.PolySynth.prototype.connect=function(e){var i=e||t.input;this.output.connect(i.input?i.input:i)},p5.PolySynth.prototype.disconnect=function(){this.output.disconnect()},p5.PolySynth.prototype.dispose=function(){this.audiovoices.forEach(function(t){t.dispose()}),this.output.disconnect(),delete this.output}}(master,Tone_signal_TimelineSignal,sndcore);var distortion;distortion=function(){function t(t){for(var e,i="number"==typeof t?t:50,n=44100,o=new Float32Array(n),s=Math.PI/180,r=0;n>r;++r)e=2*r/n-1,o[r]=(3+i)*e*20*s/(Math.PI+i*Math.abs(e));return o}var e=effect;p5.Distortion=function(i,n){if(e.call(this),"undefined"==typeof i&&(i=.25),"number"!=typeof i)throw new Error("amount must be a number");if("undefined"==typeof n&&(n="2x"),"string"!=typeof n)throw new Error("oversample must be a String");var o=p5.prototype.map(i,0,1,0,2e3);this.waveShaperNode=this.ac.createWaveShaper(),this.amount=o,this.waveShaperNode.curve=t(o),this.waveShaperNode.oversample=n,this.input.connect(this.waveShaperNode),this.waveShaperNode.connect(this.wet)},p5.Distortion.prototype=Object.create(e.prototype),p5.Distortion.prototype.process=function(t,e,i){t.connect(this.input),this.set(e,i)},p5.Distortion.prototype.set=function(e,i){if(e){var n=p5.prototype.map(e,0,1,0,2e3);this.amount=n,this.waveShaperNode.curve=t(n)}i&&(this.waveShaperNode.oversample=i)},p5.Distortion.prototype.getAmount=function(){return this.amount},p5.Distortion.prototype.getOversample=function(){return this.waveShaperNode.oversample},p5.Distortion.prototype.dispose=function(){e.prototype.dispose.apply(this),this.waveShaperNode.disconnect(),this.waveShaperNode=null}}(effect);var src_app;src_app=function(){var t=sndcore;return t}(sndcore,master,helpers,errorHandler,panner,soundfile,amplitude,fft,signal,oscillator,env,pulse,noise,audioin,filter,eq,panner3d,listener3d,delay,reverb,metro,looper,soundloop,compressor,soundRecorder,peakdetect,gain,monosynth,polysynth,distortion,audioVoice,monosynth,polysynth)});
/*! p5.js v0.5.16 October 11, 2017 */
 !function(a,b){"function"==typeof define&&define.amd?define("p5.dom",["p5"],function(a){b(a)}):b("object"==typeof exports?require("../p5"):a.p5)}(this,function(a){function b(b){var c=document;return"string"==typeof b&&"#"===b[0]?(b=b.slice(1),c=document.getElementById(b)||document):b instanceof a.Element?c=b.elt:b instanceof HTMLElement&&(c=b),c}function c(b){if("INPUT"===b.tagName&&"checkbox"===b.type){var c=new a.Element(b);return c.checked=function(){return 0===arguments.length?this.elt.checked:(arguments[0]?this.elt.checked=!0:this.elt.checked=!1,this)},c}return"VIDEO"===b.tagName||"AUDIO"===b.tagName?new a.MediaElement(b):"SELECT"===b.tagName?createSelect(new a.Element(b)):new a.Element(b)}function d(b,c,d){(c._userNode?c._userNode:document.body).appendChild(b);var e=d?new a.MediaElement(b):new a.Element(b);return c._elements.push(e),e}function e(a,b,c,e){var f=document.createElement(b),c=c||"";"string"==typeof c&&(c=[c]);for(var g=0;g<c.length;g++){var h=document.createElement("source");h.src=c[g],f.appendChild(h)}if(void 0!==e){var i=function(){e(),f.removeEventListener("canplaythrough",i)};f.addEventListener("canplaythrough",i)}var j=d(f,a,!0);return j.loadedmetadata=!1,f.addEventListener("loadedmetadata",function(){j.width=f.videoWidth,j.height=f.videoHeight,0===j.elt.width&&(j.elt.width=f.videoWidth),0===j.elt.height&&(j.elt.height=f.videoHeight),j.loadedmetadata=!0}),j}a.prototype.select=function(a,d){var e=null,f=b(d);return"."===a[0]?(a=a.slice(1),e=f.getElementsByClassName(a),e=e.length?e[0]:null):"#"===a[0]?(a=a.slice(1),e=f.getElementById(a)):(e=f.getElementsByTagName(a),e=e.length?e[0]:null),e?c(e):null},a.prototype.selectAll=function(a,d){var e,f=[],g=b(d);if("."===a[0]?(a=a.slice(1),e=g.getElementsByClassName(a)):e=g.getElementsByTagName(a),e)for(var h=0;h<e.length;h++){var i=c(e[h]);f.push(i)}return f},a.prototype.removeElements=function(a){for(var b=0;b<this._elements.length;b++)this._elements[b].elt instanceof HTMLCanvasElement||this._elements[b].remove()},["div","p","span"].forEach(function(b){var c="create"+b.charAt(0).toUpperCase()+b.slice(1);a.prototype[c]=function(a){var c=document.createElement(b);return c.innerHTML=void 0===typeof a?"":a,d(c,this)}}),a.prototype.createImg=function(){var a,b=document.createElement("img"),c=arguments,e=function(){a.width=b.offsetWidth||b.width,a.height=b.offsetHeight||b.height,c.length>1&&"function"==typeof c[1]?(a.fn=c[1],a.fn()):c.length>1&&"function"==typeof c[2]&&(a.fn=c[2],a.fn())};return b.src=c[0],c.length>1&&"string"==typeof c[1]&&(b.alt=c[1]),b.onload=function(){e()},a=d(b,this)},a.prototype.createA=function(a,b,c){var e=document.createElement("a");return e.href=a,e.innerHTML=b,c&&(e.target=c),d(e,this)},a.prototype.createSlider=function(a,b,c,e){var f=document.createElement("input");return f.type="range",f.min=a,f.max=b,0===e?f.step=1e-18:e&&(f.step=e),"number"==typeof c&&(f.value=c),d(f,this)},a.prototype.createButton=function(a,b){var c=document.createElement("button");return c.innerHTML=a,b&&(c.value=b),d(c,this)},a.prototype.createCheckbox=function(){var a=document.createElement("div"),b=document.createElement("input");b.type="checkbox",a.appendChild(b);var c=d(a,this);if(c.checked=function(){var a=c.elt.getElementsByTagName("input")[0];if(a){if(0===arguments.length)return a.checked;arguments[0]?a.checked=!0:a.checked=!1}return c},this.value=function(a){return c.value=a,this},arguments[0]){var e=Math.random().toString(36).slice(2),f=document.createElement("label");b.setAttribute("id",e),f.htmlFor=e,c.value(arguments[0]),f.appendChild(document.createTextNode(arguments[0])),a.appendChild(f)}return arguments[1]&&(b.checked=!0),c},a.prototype.createSelect=function(){var a,b,c=arguments[0];return"object"==typeof c&&"SELECT"===c.elt.nodeName?(b=c,a=this.elt=c.elt):(a=document.createElement("select"),c&&"boolean"==typeof c&&a.setAttribute("multiple","true"),b=d(a,this)),b.option=function(b,c){for(var d,e=0;e<this.elt.length;e++)if(this.elt[e].innerHTML==b){d=e;break}if(void 0!==d)c===!1?this.elt.remove(d):this.elt[d].innerHTML==this.elt[d].value?this.elt[d].innerHTML=this.elt[d].value=c:this.elt[d].value=c;else{var f=document.createElement("option");f.innerHTML=b,arguments.length>1?f.value=c:f.value=b,a.appendChild(f)}},b.selected=function(a){var b=[];if(arguments.length>0){for(var c=0;c<this.elt.length;c++)a.toString()===this.elt[c].value&&(this.elt.selectedIndex=c);return this}if(this.elt.getAttribute("multiple")){for(var c=0;c<this.elt.selectedOptions.length;c++)b.push(this.elt.selectedOptions[c].value);return b}return this.elt.value},b},a.prototype.createRadio=function(){var a=document.querySelectorAll("input[type=radio]"),b=0;if(a.length>1){var c=a.length,e=a[0].name,f=a[1].name;b=1;for(var g=1;g<c;g++)f=a[g].name,e!=f&&b++,e=f}else 1==a.length&&(b=1);var h=document.createElement("div"),i=d(h,this),j=-1;return i.option=function(a,c){var d=document.createElement("input");if(d.type="radio",d.innerHTML=a,arguments.length>1?d.value=c:d.value=a,d.setAttribute("name","defaultradio"+b),h.appendChild(d),a){j++;var e=(Math.random().toString(36).slice(2),document.createElement("label"));d.setAttribute("id","defaultradio"+b+"-"+j),e.htmlFor="defaultradio"+b+"-"+j,e.appendChild(document.createTextNode(a)),h.appendChild(e)}return d},i.selected=function(){var a=this.elt.childNodes.length;if(1==arguments.length){for(var b=0;b<a;b+=2)this.elt.childNodes[b].value==arguments[0]&&(this.elt.childNodes[b].checked=!0);return this}for(var b=0;b<a;b+=2)if(1==this.elt.childNodes[b].checked)return this.elt.childNodes[b].value},i.value=function(){var a=this.elt.childNodes.length;if(1==arguments.length){for(var b=0;b<a;b+=2)this.elt.childNodes[b].value==arguments[0]&&(this.elt.childNodes[b].checked=!0);return this}for(var b=0;b<a;b+=2)if(1==this.elt.childNodes[b].checked)return this.elt.childNodes[b].value;return""},i},a.prototype.createInput=function(a,b){var c=document.createElement("input");return c.type=b?b:"text",a&&(c.value=a),d(c,this)},a.prototype.createFileInput=function(b,c){function e(c){function d(c){var d=new a.File(c);return function(a){d.data=a.target.result,b(d)}}for(var e=c.target.files,f=0;f<e.length;f++){var g=e[f],h=new FileReader;h.onload=d(g),g.type.indexOf("text")>-1?h.readAsText(g):h.readAsDataURL(g)}}if(window.File&&window.FileReader&&window.FileList&&window.Blob){var f=document.createElement("input");return f.type="file",c&&(f.multiple="multiple"),f.addEventListener("change",e,!1),d(f,this)}console.log("The File APIs are not fully supported in this browser. Cannot create element.")},a.prototype.createVideo=function(a,b){return e(this,"video",a,b)},a.prototype.createAudio=function(a,b){return e(this,"audio",a,b)},a.prototype.VIDEO="video",a.prototype.AUDIO="audio",void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(a){var b=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return b?new Promise(function(c,d){b.call(navigator,a,c,d)}):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}),a.prototype.createCapture=function(){for(var b,c,e=!0,f=!0,g=0;g<arguments.length;g++)arguments[g]===a.prototype.VIDEO?f=!1:arguments[g]===a.prototype.AUDIO?e=!1:"object"==typeof arguments[g]?b=arguments[g]:"function"==typeof arguments[g]&&(c=arguments[g]);if(!navigator.getUserMedia)throw"getUserMedia not supported in this browser";var h=document.createElement("video");b||(b={video:e,audio:f}),navigator.mediaDevices.getUserMedia(b).then(function(a){try{"srcObject"in h?h.srcObject=a:h.src=window.URL.createObjectURL(a)}catch(b){h.src=a}c&&c(a)},function(a){console.log(a)});var i=d(h,this,!0);return i.loadedmetadata=!1,h.addEventListener("loadedmetadata",function(){h.play(),h.width?(i.width=h.videoWidth=h.width,i.height=h.videoHeight=h.height):(i.width=i.elt.width=h.videoWidth,i.height=i.elt.height=h.videoHeight),i.loadedmetadata=!0}),i},a.prototype.createElement=function(a,b){var c=document.createElement(a);return void 0!==b&&(c.innerHTML=b),d(c,this)},a.Element.prototype.addClass=function(a){return this.elt.className?this.elt.className=this.elt.className+" "+a:this.elt.className=a,this},a.Element.prototype.removeClass=function(a){var b=new RegExp("(?:^|\\s)"+a+"(?!\\S)");return this.elt.className=this.elt.className.replace(b,""),this.elt.className=this.elt.className.replace(/^\s+|\s+$/g,""),this},a.Element.prototype.child=function(b){return void 0===b?this.elt.childNodes:("string"==typeof b?("#"===b[0]&&(b=b.substring(1)),b=document.getElementById(b)):b instanceof a.Element&&(b=b.elt),this.elt.appendChild(b),this)},a.Element.prototype.center=function(a){var b=this.elt.style.display,c="none"===this.elt.style.display,d="none"===this.parent().style.display,e={x:this.elt.offsetLeft,y:this.elt.offsetTop};c&&this.show(),this.elt.style.display="block",this.position(0,0),d&&(this.parent().style.display="block");var f=Math.abs(this.parent().offsetWidth-this.elt.offsetWidth),g=Math.abs(this.parent().offsetHeight-this.elt.offsetHeight),h=e.y,i=e.x;return"both"===a||void 0===a?this.position(f/2,g/2):"horizontal"===a?this.position(f/2,h):"vertical"===a&&this.position(i,g/2),this.style("display",b),c&&this.hide(),d&&(this.parent().style.display="none"),this},a.Element.prototype.html=function(){return 0===arguments.length?this.elt.innerHTML:arguments[1]?(this.elt.innerHTML+=arguments[0],this):(this.elt.innerHTML=arguments[0],this)},a.Element.prototype.position=function(){return 0===arguments.length?{x:this.elt.offsetLeft,y:this.elt.offsetTop}:(this.elt.style.position="absolute",this.elt.style.left=arguments[0]+"px",this.elt.style.top=arguments[1]+"px",this.x=arguments[0],this.y=arguments[1],this)},a.Element.prototype._translate=function(){this.elt.style.position="absolute";var a="";return this.elt.style.transform&&(a=this.elt.style.transform.replace(/translate3d\(.*\)/g,""),a=a.replace(/translate[X-Z]?\(.*\)/g,"")),2===arguments.length?this.elt.style.transform="translate("+arguments[0]+"px, "+arguments[1]+"px)":arguments.length>2&&(this.elt.style.transform="translate3d("+arguments[0]+"px,"+arguments[1]+"px,"+arguments[2]+"px)",3===arguments.length?this.elt.parentElement.style.perspective="1000px":this.elt.parentElement.style.perspective=arguments[3]+"px"),this.elt.style.transform+=a,this},a.Element.prototype._rotate=function(){var a="";if(this.elt.style.transform){var a=this.elt.style.transform.replace(/rotate3d\(.*\)/g,"");a=a.replace(/rotate[X-Z]?\(.*\)/g,"")}return 1===arguments.length?this.elt.style.transform="rotate("+arguments[0]+"deg)":2===arguments.length?this.elt.style.transform="rotate("+arguments[0]+"deg, "+arguments[1]+"deg)":3===arguments.length&&(this.elt.style.transform="rotateX("+arguments[0]+"deg)",this.elt.style.transform+="rotateY("+arguments[1]+"deg)",this.elt.style.transform+="rotateZ("+arguments[2]+"deg)"),this.elt.style.transform+=a,this},a.Element.prototype.style=function(b,c){var d=this;if(c instanceof a.Color&&(c="rgba("+c.levels[0]+","+c.levels[1]+","+c.levels[2]+","+c.levels[3]/255+")"),void 0===c){if(b.indexOf(":")===-1)return window.getComputedStyle(d.elt).getPropertyValue(b);for(var e=b.split(";"),f=0;f<e.length;f++){var g=e[f].split(":");g[0]&&g[1]&&(this.elt.style[g[0].trim()]=g[1].trim())}}else if("rotate"===b||"translate"===b||"position"===b){var h=Array.prototype.shift.apply(arguments),i=this[h]||this["_"+h];i.apply(this,arguments)}else if(this.elt.style[b]=c,"width"===b||"height"===b||"left"===b||"top"===b){var j=c.replace(/\D+/g,"");this[b]=parseInt(j,10)}return this},a.Element.prototype.attribute=function(a,b){if(null==this.elt.firstChild||"checkbox"!==this.elt.firstChild.type&&"radio"!==this.elt.firstChild.type)return void 0===b?this.elt.getAttribute(a):(this.elt.setAttribute(a,b),this);if(void 0===b)return this.elt.firstChild.getAttribute(a);for(var c=0;c<this.elt.childNodes.length;c++)this.elt.childNodes[c].setAttribute(a,b)},a.Element.prototype.removeAttribute=function(a){if(null!=this.elt.firstChild&&("checkbox"===this.elt.firstChild.type||"radio"===this.elt.firstChild.type))for(var b=0;b<this.elt.childNodes.length;b++)this.elt.childNodes[b].removeAttribute(a);return this.elt.removeAttribute(a),this},a.Element.prototype.value=function(){return arguments.length>0?(this.elt.value=arguments[0],this):"range"===this.elt.type?parseFloat(this.elt.value):this.elt.value},a.Element.prototype.show=function(){return this.elt.style.display="block",this},a.Element.prototype.hide=function(){return this.elt.style.display="none",this},a.Element.prototype.size=function(b,c){if(0===arguments.length)return{width:this.elt.offsetWidth,height:this.elt.offsetHeight};var d=b,e=c,f=a.prototype.AUTO;if(d!==f||e!==f){if(d===f?d=c*this.width/this.height:e===f&&(e=b*this.height/this.width),this.elt instanceof HTMLCanvasElement){var g={},h=this.elt.getContext("2d");for(var i in h)g[i]=h[i];this.elt.setAttribute("width",d*this._pInst._pixelDensity),this.elt.setAttribute("height",e*this._pInst._pixelDensity),this.elt.setAttribute("style","width:"+d+"px; height:"+e+"px"),this._pInst.scale(this._pInst._pixelDensity,this._pInst._pixelDensity);for(var i in g)this.elt.getContext("2d")[i]=g[i]}else this.elt.style.width=d+"px",this.elt.style.height=e+"px",this.elt.width=d,this.elt.height=e,this.width=d,this.height=e;this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight,this._pInst&&this._pInst._curElement.elt===this.elt&&(this._pInst._setProperty("width",this.elt.offsetWidth),this._pInst._setProperty("height",this.elt.offsetHeight))}return this},a.Element.prototype.remove=function(){for(var a in this._events)this.elt.removeEventListener(a,this._events[a]);this.elt.parentNode&&this.elt.parentNode.removeChild(this.elt),delete this},a.MediaElement=function(b,c){a.Element.call(this,b,c);var d=this;this.elt.crossOrigin="anonymous",this._prevTime=0,this._cueIDCounter=0,this._cues=[],this._pixelDensity=1,this._modified=!1,Object.defineProperty(d,"src",{get:function(){var a=d.elt.children[0].src,b=d.elt.src===window.location.href?"":d.elt.src;return a===window.location.href?b:a},set:function(a){for(var c=0;c<d.elt.children.length;c++)d.elt.removeChild(d.elt.children[c]);var e=document.createElement("source");e.src=a,b.appendChild(e),d.elt.src=a,d.modified=!0}}),d._onended=function(){},d.elt.onended=function(){d._onended(d)}},a.MediaElement.prototype=Object.create(a.Element.prototype),a.MediaElement.prototype.play=function(){return this.elt.currentTime===this.elt.duration&&(this.elt.currentTime=0),this.elt.readyState>1?this.elt.play():(this.elt.load(),this.elt.play()),this},a.MediaElement.prototype.stop=function(){return this.elt.pause(),this.elt.currentTime=0,this},a.MediaElement.prototype.pause=function(){return this.elt.pause(),this},a.MediaElement.prototype.loop=function(){return this.elt.setAttribute("loop",!0),this.play(),this},a.MediaElement.prototype.noLoop=function(){return this.elt.setAttribute("loop",!1),this},a.MediaElement.prototype.autoplay=function(a){return this.elt.setAttribute("autoplay",a),this},a.MediaElement.prototype.volume=function(a){if(void 0===a)return this.elt.volume;this.elt.volume=a},a.MediaElement.prototype.speed=function(a){if(void 0===a)return this.elt.playbackRate;this.elt.playbackRate=a},a.MediaElement.prototype.time=function(a){if(void 0===a)return this.elt.currentTime;this.elt.currentTime=a},a.MediaElement.prototype.duration=function(){return this.elt.duration},a.MediaElement.prototype.pixels=[],a.MediaElement.prototype.loadPixels=function(){return this.canvas||(this.canvas=document.createElement("canvas"),this.drawingContext=this.canvas.getContext("2d")),this.loadedmetadata&&(this.canvas.width!==this.elt.width&&(this.canvas.width=this.elt.width,this.canvas.height=this.elt.height,this.width=this.canvas.width,this.height=this.canvas.height),this.drawingContext.drawImage(this.elt,0,0,this.canvas.width,this.canvas.height),a.Renderer2D.prototype.loadPixels.call(this)),this.setModified(!0),this},a.MediaElement.prototype.updatePixels=function(b,c,d,e){return this.loadedmetadata&&a.Renderer2D.prototype.updatePixels.call(this,b,c,d,e),this.setModified(!0),this},a.MediaElement.prototype.get=function(b,c,d,e){return this.loadedmetadata?a.Renderer2D.prototype.get.call(this,b,c,d,e):void 0===b?new a.Image(1,1):d>1?new a.Image(b,c,d,e):[0,0,0,255]},a.MediaElement.prototype.set=function(b,c,d){this.loadedmetadata&&(a.Renderer2D.prototype.set.call(this,b,c,d),this.setModified(!0))},a.MediaElement.prototype.copy=function(){a.Renderer2D.prototype.copy.apply(this,arguments)},a.MediaElement.prototype.mask=function(){this.loadPixels(),this.setModified(!0),a.Image.prototype.mask.apply(this,arguments)},a.MediaElement.prototype.isModified=function(){return this._modified},a.MediaElement.prototype.setModified=function(a){this._modified=a},a.MediaElement.prototype.onended=function(a){return this._onended=a,this},a.MediaElement.prototype.connect=function(b){var c,d;if("function"==typeof a.prototype.getAudioContext)c=a.prototype.getAudioContext(),d=a.soundOut.input;else try{c=b.context,d=c.destination}catch(a){throw"connect() is meant to be used with Web Audio API or p5.sound.js"}this.audioSourceNode||(this.audioSourceNode=c.createMediaElementSource(this.elt),this.audioSourceNode.connect(d)),b?b.input?this.audioSourceNode.connect(b.input):this.audioSourceNode.connect(b):this.audioSourceNode.connect(d)},a.MediaElement.prototype.disconnect=function(){if(!this.audioSourceNode)throw"nothing to disconnect";this.audioSourceNode.disconnect()},a.MediaElement.prototype.showControls=function(){this.elt.style["text-align"]="inherit",this.elt.controls=!0},a.MediaElement.prototype.hideControls=function(){this.elt.controls=!1},a.MediaElement.prototype.addCue=function(a,b,c){var d=this._cueIDCounter++,e=new f(b,a,d,c);return this._cues.push(e),this.elt.ontimeupdate||(this.elt.ontimeupdate=this._onTimeUpdate.bind(this)),d},a.MediaElement.prototype.removeCue=function(a){for(var b=0;b<this._cues.length;b++)this._cues[b]===a&&(console.log(a),this._cues.splice(b,1));0===this._cues.length&&(this.elt.ontimeupdate=null)},a.MediaElement.prototype.clearCues=function(){this._cues=[],this.elt.ontimeupdate=null},a.MediaElement.prototype._onTimeUpdate=function(){for(var a=this.time(),b=0;b<this._cues.length;b++){var c=this._cues[b].time,d=this._cues[b].val;this._prevTime<c&&c<=a&&this._cues[b].callback(d)}this._prevTime=a};var f=function(a,b,c,d){this.callback=a,this.time=b,this.id=c,this.val=d};a.File=function(a,b){this.file=a,this._pInst=b;var c=a.type.split("/");this.type=c[0],this.subtype=c[1],this.name=a.name,this.size=a.size,this.data=void 0}});
/**
 * Javascript behaviors for Filterrific.
 * http://filterrific.clearcove.ca
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */



// Create global Filterrific namespace
if (typeof Filterrific === 'undefined') {
  var Filterrific = {};
}



// Define function to submit Filterrific filter form
Filterrific.submitFilterForm = function(){
  var form = $(this).parents("form"),
      url = form.attr("action");
  // turn on spinner
  $('.filterrific_spinner').show();
  // Submit ajax request
  $.ajax({
    url: url,
    data: form.serialize(),
    type: 'GET',
    dataType: 'script'
  }).done(function( msg ) {
    $('.filterrific_spinner').hide();
  });
};



//
// Embed jquery.observe_field.js to observe Filterrific filter inputs
//
// Copied from https://github.com/splendeo/jquery.observe_field
// Wrap in immediately invoked function for compatibility with other js libraries
//
(function($) {

  $.fn.filterrific_observe_field = function(frequency, callback) {
    frequency = frequency * 1000; // translate to milliseconds
    return this.each(function(){
      var $this = $(this);
      var prev = $this.val();
      var check = function() {
        if(removed()){ // if removed clear the interval and don't fire the callback
          if(ti) clearInterval(ti);
          return;
        }
        var val = $this.val();
        if(prev != val){
          prev = val;
          $this.map(callback); // invokes the callback on $this
        }
      };
      var removed = function() {
        return $this.closest('html').length == 0
      };
      var reset = function() {
        if(ti){
          clearInterval(ti);
          ti = setInterval(check, frequency);
        }
      };
      check();
      var ti = setInterval(check, frequency); // invoke check periodically
      // reset counter after user interaction
      $this.bind('keyup click mousemove', reset); //mousemove is for selects
    });
  };
})(jQuery);


Filterrific.init = function() {
  // Add change event handler to all Filterrific filter inputs.
  $('#filterrific_filter').on(
    "change",
    ":input",
    Filterrific.submitFilterForm
  );

  // Add periodic observer to selected inputs.
  // Use this for text fields you want to observe for change, e.g., a search input.
  $(".filterrific-periodically-observed").filterrific_observe_field(
    0.5,
    Filterrific.submitFilterForm
  );
};


// Initialize event observers on document ready and turbolinks page:load
jQuery(document).on('turbolinks:load', function() {
  // Prevent double initilisation. With turbolinks 5 this function
  // will be called twice: on 'ready' and 'turbolinks:load'
  jQuery(document).off('ready page:load')
  Filterrific.init();
});

jQuery(document).on('ready page:load', function() {
  Filterrific.init();
});
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-default' ),
		didScroll = false,
		changeHeaderOn = 300;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
		}
		else {
			classie.remove( header, 'navbar-shrink' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */





( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */


$(document).ready(function(){
  (function($) {
      "use strict"; // Start of use strict
      // jQuery for page scrolling feature - requires jQuery Easing plugin
      $('a.page-scroll').bind('click', function(event) {
          var $anchor = $(this);
          $('html, body').stop().animate({
              scrollTop: ($($anchor.attr('href')).offset().top - 50)
          }, 1250, 'easeInOutExpo');
          event.preventDefault();
      });

      // Highlight the top nav as scrolling occurs
      $('body').scrollspy({
          target: '.navbar-fixed-top',
          offset: 51
      })

      // Closes the Responsive Menu on Menu Item Click
      $('.navbar-collapse ul li a').click(function() {
          $('.navbar-toggle:visible').click();
      });

      // Fit Text Plugin for Main Header
      $("h1").fitText(
          1.2, {
              minFontSize: '35px',
              maxFontSize: '65px'
          }
      );

      // Offset for Main Navigation
      $('#mainNav').affix({
          offset: {
              top: 100
          }
      })

      // Initialize WOW.js Scrolling Animations
      new WOW().init();

  })(jQuery); // End of use strict

})
;
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/


(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
/*! WOW - v1.1.2 - 2015-04-07
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);






















(function() {


}).call(this);
(function() {


}).call(this);
/* Copyright 2013 Chris Wilson
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 Modified and annotated 4/6/2014 by Ethan Petuchowski
 */

// window.AudioContext = window.AudioContext || window.webkitAudioContext;

// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
// "This is an experimental technology"
// "This technology's specification has not stabilized"
//
// http://www.w3.org/TR/webaudio/
// "This specification describes a high-level JavaScript API for processing
// and synthesizing audio in web applications. The primary paradigm is of an
// audio routing graph, where a number of AudioNode objects are connected
// together to define the overall audio rendering. The actual processing will
// primarily take place in the underlying implementation (typically optimized
// Assembly / C / C++ code), but direct JavaScript processing and synthesis is
// also supported."
//
// See more notes in my "Web Programming Notes.md"
// var audioContext = new AudioContext();
//
// var audioInput = null,
//     realAudioInput = null,
//     inputPoint = null,
//     audioRecorder = null;
//
// var rafID = null;
//
// var analyserContext = null;
//
// var canvasWidth, canvasHeight;
//
// var recIndex = 0;
//
// // TODO this never gets called! but this is what I need to call to save the audio...
// function saveAudio() {
//     audioRecorder.exportWAV(doneEncoding);
//     // could get mono instead by saying
//     // audioRecorder.exportMonoWAV( doneEncoding );
// }
//
// function gotBuffers(buffers) {
//
//     // The lower canvas box, displaying the recorded wave-form
//     var canvas = document.getElementById("wavedisplay");
//
//     // render the lower image (zoomed-out image of the waveform)
//     drawBuffer(canvas.width, canvas.height, canvas.getContext('2d'), buffers[0]);
//
//     // Enable the HDD button to download the audiofile
//     audioRecorder.exportWAV(doneEncoding);
// }
//
// function doneEncoding(blob) {
//     // Params: (audio data as "Blob", desired filename)
//     // Enable's HDD button to download audiofile by setting its attributes
//     Recorder.setupDownload(blob, "myRecording" + (recIndex < 10 ? "0":"")+recIndex+".wav");
//     recIndex++;
// }
//
// // Called onClick of the Record button
// // "e" is the "img HTML element" that you click on
// function toggleRecording(e) {
//     console.log(e);
//     if (e.classList.contains("recording")) {
//         // stop recording
//         audioRecorder.stop();
//         e.classList.remove("recording");
//         audioRecorder.getBuffers(gotBuffers);
//     } else {
//         // start recording
//         if (!audioRecorder) return;
//         e.classList.add("recording");
//
//         // this is the Recorder() from "recorder.js"
//         //
//         audioRecorder.clear();
//         audioRecorder.record();
//     }
// }
//
// function convertToMono(input) {
//     var splitter = audioContext.createChannelSplitter(2);
//     var merger = audioContext.createChannelMerger(2);
//
//     input.connect(splitter);
//     splitter.connect(merger, 0, 0);
//     splitter.connect(merger, 0, 1);
//     return merger;
// }
//
// function cancelAnalyserUpdates() {
//     window.cancelAnimationFrame(rafID);
//     rafID = null;
// }
//
// // Called after gotStream() below,
// // which creates a silenced AudioContext graph.
// // Also calls itself in callback from window.requestAnimationFrame() at the
// // bottom of this method.
// function updateAnalysers(time) {
//     if (!analyserContext) {
//         var canvas = document.getElementById("analyser");
//         canvasWidth = canvas.width;
//         canvasHeight = canvas.height;
//
//         // Returns an object that provides methods and properties for drawing
//         // on the canvas.
//         analyserContext = canvas.getContext('2d');
//     }
//
//     /** QUESTION:
//      *    Why is this block of code surrounded by its own braces?
//      */
//
//     // analyzer draw code here
//     {
//         // Configure some FFT display layout
//         var SPACING = 3;        // each FFT bar starts 3 pixels apart
//         var BAR_WIDTH = 1;      // each FFT bar is 1 pixel wide (so there's 2 px btn them)
//         var numBars = Math.round(canvasWidth / SPACING);
//
//         // Acquire the data from the AudioContext's Analyser FFT node
//         var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
//         analyserNode.getByteFrequencyData(freqByteData);
//
//         // Clear the whole thing
//         analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
//
//         // Fill it with an orangey color
//         analyserContext.fillStyle = '#F6D565';
//
//         // When drawing a line, its ends shall be round
//         analyserContext.lineCap = 'round';
//
//         // Figure the number of FFT bins per bar-chart bar
//         var multiplier = analyserNode.frequencyBinCount / numBars;
//
//         // Draw rectangle for each frequency bin.
//         for (var i = 0; i < numBars; ++i) {
//
//             var magnitude = 0;
//             var offset = Math.floor(i * multiplier);
//
//             // Average the bar over its constituent bins
//             for (var j = 0; j < multiplier; j++)
//                 magnitude += freqByteData[offset + j];
//             magnitude = magnitude / multiplier;
//
//             // Set color based on sliding around the hue value by using
//             // Hue-Saturation-Lightness based coloring
//             analyserContext.fillStyle = "hsl( " + Math.round((i * 360) / numBars) + ", 100%, 50%)";
//
//             // Draw a filled rectangle with (x,y, xOff, yOff) coordinates
//             analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
//         }
//     }
//
//     // "Note: Your callback routine must itself call requestAnimationFrame()
//     //  if you want to animate another frame at the next repaint."
//     rafID = window.requestAnimationFrame(updateAnalysers);
// }
//
// function toggleMono() {
//     if (audioInput != realAudioInput) {
//         audioInput.disconnect();
//         realAudioInput.disconnect();
//         audioInput = realAudioInput;
//     } else {
//         realAudioInput.disconnect();
//         audioInput = convertToMono(realAudioInput);
//     }
//
//     audioInput.connect(inputPoint);
// }
//
//
// // successCallback from requesting audio in initAudio->getUserMedia() below
// function gotStream(stream) {
//
//     // Creates a GainNode in the AudioContext graph
//     // See notes in "Web Programming Notes.md"
//     inputPoint = audioContext.createGain();
//
//     // "Create a MediaStreamAudioSourceNode associated with a WebRTC
//     // MediaStream representing an audio stream, that may come from the local
//     // computer microphone or other sources."
//     realAudioInput = audioContext.createMediaStreamSource(stream);
//     audioInput = realAudioInput;
//
//     // Connect the microphone's MediaStreamAudioSourceNode stream
//     // to the GainNode's stream
//     audioInput.connect(inputPoint);
//
//     //    audioInput = convertToMono( input );
//
//     // Create an AnalyserNode
//     // a node able to provide real-time frequency and time-domain
//     // analysis information
//     analyserNode = audioContext.createAnalyser();
//
//     // Represents the size of the Fast Fourier Transform to be used to
//     // determine the frequency domain. 2048 is both the default and the
//     // biggest allowed value
//     analyserNode.fftSize = 2048;
//
//     // Connect the GainNode into the FFT node
//     inputPoint.connect(analyserNode);
//
//     // Use Matt Diamond's "recorder.js" (also in this dir)
//     // https://github.com/mattdiamond/Recorderjs
//     // to create a recorder object that will buffer the raw audio.
//     // We are not passing in any (optional) configuration settings.
//     audioRecorder = new Recorder(inputPoint);
//
//     // Create another GainNode to silence the graph's output
//     zeroGain = audioContext.createGain();
//     zeroGain.gain.value = 0.0;
//     inputPoint.connect(zeroGain);
//     zeroGain.connect(audioContext.destination);   // plug it into the final
//     // destination of all audio
//     // in the context
//     updateAnalysers();
// }
//
// // on page load, request access to the user's audio-stream,
// // in a browser-generic manner
// function initAudio() {
//     var n = navigator;  // with luck, adding this didn't break everything
//
//     // Prompts the user for permission to use a media device such as a camera or microphone.
//     // If the user provides permission, the successCallback is invoked on the calling
//     // application with a LocalMediaStream object as its argument.
//     n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia; // set it to whichever version exists
//
//     // Cancels an animation frame request previously scheduled through a call to window.requestAnimationFrame().
//     n.cancelAnimationFrame = n.cancelAnimationFrame || n.webkitCancelAnimationFrame || n.mozCancelAnimationFrame;
//
//     // Requests that the browser call a specified function to update an animation before the next repaint.
//     // The method takes as an argument a callback to be invoked before the repaint.
//     n.requestAnimationFrame = n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame;
//
//     // Parameters: ( constraints, successCallback, errorCallback );
//     n.getUserMedia({audio: true}, gotStream, function (e) {
//         alert('Error getting audio');
//         console.log(e);
//     });
// }
//
// // on page-load, call initAudio
// window.addEventListener('load', initAudio);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






//= requrie gmaps/google





$(function() {
  // $("#list th a, #products .pagination a").live("click", function() {
  //   $.getScript(this.href);
  //   return false;
  // });
  // $("#jam_search input").keyup(function() {
  //   $.get($("#jam_search").attr("action"), $("#jam_search").serialize(), null, "script");
  //   return false;
  // });
  $("#name-search").keyup(function(){
     $("#jam-search").submit();
  });
  $("#jam-search").change(function(){
     $("#jam-search").submit();
  });
  $("#name-search").change(function(){
     $("#jam-search").submit();
  });
});
$(document).ready(function() {
  $('select').niceSelect();
});
