# Bera

A simple JavaScript utility for generating classnames following the ABEM principles.

## Usage:

```js
import bem from "bera";

bem("button", "label", ["visible", "active"]);
// => 'button__label -visible -active'
```

The library can also be used directly on the page just including the `index.js` in a standalone `<script>` tag; or by RequireJS.

## About

Bera is a variant of [bero](https://github.com/zer0/bero), a utility created by Matteo Ferretti. What bero is to [BEM](https://en.bem.info/),
bera is to [ABEM](https://css-tricks.com/abem-useful-adaptation-bem/): It follows the same non-invasive approach inspired by
`classnames` to generate classnames for the ABEM naming convention.

### Why "bera"?

In line with Matteo's inspiration for naming bero, it's a character from _Yōkai Ningen Bem (妖怪人間ベム Yōkai Ningen Bemu_, translated officially as _Humanoid Monster Bem_).

## Usage

The `bem` function is a curried function, takes up to three arguments.

The simplest usage is the basic signature with two arguments, `identifier` and `modifiers`:

```js
bem(identifier: String, modifiers: Array|Object) : String
```

### `identifier: String`

The `identifier` can be either a `block`, or an `element`.

If an `element` is specified, the full identifier has to be written, in the form of `block__elem`. For example:

```js
bem("button__label", ["visible", "active"]);
// => 'button__label  -visible -active'
```

Since `bem` is a curried function, it also possible write the code above as:

```js
const label = bem("button__label");

label(["visible", "active"]);
// => 'button__label -visible -active'
```

This form would be rarely used for elements; it's more common having _block functions_, when the signature with three arguments is used:

```js
bem(block: String, elem: String, modifiers: Array|Object) : String
```

In this form, the equivalent of the code above would be:

```js
bem("button", "label", ["visible", "active"]);
// => 'button__label -visible -active'
```

But it would be more common used as curried function for _block functions_:

```js
const button = bem("button");

button("label", ["visible", "active"]);
// => 'button__label -visible -active'
```

This form is useful especially in components, where there is likely only one block per component, but multiple elements as children of that block.

### `modifiers: Array|Object`

The `modifiers` arguments can be either an `Array` or an `Object`.
The logic is the same of [@JedWatson](https://github.com/JedWatson)'s [classnames](https://github.com/JedWatson/classnames) module.

If it's an `Array`, every element that is considered _truthy_, would be
added as modifier in the resulting classname:

```js
bem("button__label", [false, "visible", 0, , "", undefined, "active"]);
// =>  button__label -visible -active'
```

However, `modifiers` really shines when an `Object` is given:

```js
bem("button__label", {
  visible: isVisible,
  active: isActive
});
// with `isVisible`: true, `isActive`: true
// => button__label -visible -active'

// with `isVisible`: true, `isActive`: false
// => button__label -visible'

// with `isVisible`: false, `isActive`: true
// => button__label -active'

// with `isVisible`: false, `isActive`: false
// => button__label
```

With [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) you can also have modifiers as such:

```js
bem("button__label", {
  [`text-${color}`]: !!color
});
// with `color`: undefined:
// => button__label

// with `color`: "red"
// => button__label -textRed
```

#### camelCase modifiers

All modifiers are automatically converted to camel case:

```js
bem("button__label", {
  'has-focus': true
});
// with `has-focus`: true
// => button__label -hasFocus

// with "text-red": red
bem("button__label", ["ColorRed"]);
// => button__label -colorRed
```

Likely cases of abbreviation will be retained:

```js
bem("button__label", ["DOMLoaded"]);
// => button__label -DOMLoaded
```

Any number of hyphens at the beginning of the string will be removed:

```js
bem("button__label", ["-foo", "--bar", "---baz"]);
// => button__label -foo -bar -baz
```

And any numbers of hyphen inside the string will be removed and the first letter of the suffix properly cased:

```js
bem("button__label", ["foo----bar"]);
// => button__label -fooBar
```

So that even in those edge cases the ABEM naming convention is kept.

### The `join` function

`bera` comes with an utility function that helps to concatenate several `truthy` values in one string. That's useful when the generated _BEM_ classname needs to
be concatenate by external strings, such a `className` passed by props in React. See below for a real-world example.

### Usage with React Component.

```js
import bem, { join } from "bero";

const button = bem("button");

export default class Button {
  // ...
  render() {
    const { pressed, hover } = this.state;
    const { className, label, onClick } = this.props;

    return (
      <button
        className={join(button({ pressed, hover }), className)}
        onClick={onClick}
      >
        <label className={button("label", ["strong"])}>{label}</label>
      </button>
    );
  }
}
```

## License

[MIT](LICENSE.md). Copyright (c) 2018 Nuey San Waldman
