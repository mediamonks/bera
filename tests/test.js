const test = require("tape");
const abem = require("../");

test("abem() returns itself", assert => {
  assert.equal(abem(), abem, "calling abem without arguments returns itself");
  assert.end();
});

test("abem(block, elem, Object) full signature call", assert => {
  const classname = abem("block", "elem", {
    fooBar: true,
    baz: 1,
    qux: undefined
  });

  assert.equal(
    classname,
    "block__elem -fooBar -baz",
    "calling abem with full signature returns the expected string"
  );

  assert.end();
});

test("abem(block, elem, Array) full signature call", assert => {
  const classname = abem("block", "elem", ["fooBar", "baz", undefined]);

  assert.equal(
    classname,
    "block__elem -fooBar -baz",
    "calling abem with full signature returns the expected string"
  );

  assert.end();
});

test("abem(block, Object) returns the expected classname", assert => {
  assert.equal(
    abem("block", { foo: true, bar: false, bazQux: 1 }),
    "block -foo -bazQux"
  );

  assert.end();
});

test("abem(block, Array) returns the expected classname", assert => {
  assert.equal(
    abem("block", ["foo", undefined, "bazQux"]),
  "block -foo -bazQux"
  );

  assert.end();
});

test("abem(block, Object) returns kebab case modifiers", assert => {
  assert.equal(
    abem("block", { FooBar: true, ["BAZ-Qux"]: true, DOMContentLoaded: true }),
    "block -fooBar -BAZQux -DOMContentLoaded"
  );

  assert.end();
});

test("abem(block, Array) returns kebab case modifiers", assert => {
  assert.equal(
    abem("block", ["FooBar", "BAZ-Qux", "DOMContentLoaded"]),
    "block -fooBar -BAZQux -DOMContentLoaded"
  );

  assert.end();
});

test("abem(block) only block given", assert => {
  const block = abem("block");

  assert.equal(
    typeof block,
    "function",
    "calling abem with just the block given, returns a function"
  );

  assert.equal(
    block(),
    "block",
    "calling the block function without args returns the expected classname"
  );

  assert.end();
});

test("abem(block)(elem) returns the expected classname", assert => {
  const block = abem("block");

  assert.equal(block("elem"), "block__elem");

  assert.end();
});

test("abem(block)(Object) returns the expected classname", assert => {
  const block = abem("block");

  assert.equal(
    block({ foo: true, bar: false, bazQux: 1 }),
    "block -foo -bazQux"
  );

  assert.end();
});

test("abem(block)(Array) returns the expected classname", assert => {
  const block = abem("block");

  assert.equal(
    block(["foo", undefined, "bazQux"]),
    "block -foo -bazQux"
  );

  assert.end();
});

test("abem(block)(elem, Object) returns the expected classname", assert => {
  const block = abem("block");

  assert.equal(
    block("elem", { foo: true, bazQux: true, bar: 1 }),
    "block__elem -foo -bazQux -bar"
  );

  assert.end();
});

test("abem(block)(elem, Array) returns the expected classname", assert => {
  const block = abem("block");

  assert.equal(
    block("elem", ["foo", undefined, "bazQux", "bar"]),
    "block__elem -foo -bazQux -bar"
  );

  assert.end();
});

test("abem(block + elem) returns an element function", assert => {
  const elem = abem("block__elem");

  assert.equal(
    typeof elem,
    "function",
    "calling abem with element as first arg returns a function"
  );

  assert.equal(
    elem(),
    "block__elem",
    "calling the element function returns the full expected classname"
  );

  assert.end();
});

test.skip("abem(block + elem) can't be called with an additional identifier", assert => {
  const elem = abem("block__elem");

  assert.throws(() => elem("what"));

  assert.end();
});

test("abem(block + elem, Object) returns the expected classname", assert => {
  const elem = abem("block__elem");

  assert.equal(
    elem({ foo: true, bazQux: true, bar: 1 }),
    "block__elem -foo -bazQux -bar"
  );

  assert.end();
});

test("abem(block, elem) returns an element function", assert => {
  const elem = abem("block", "elem");

  assert.equal(
    typeof elem,
    "function",
    "calling abem with element as first arg returns a function"
  );

  assert.equal(
    elem(),
    "block__elem",
    "calling the element function returns the full expected classname"
  );

  assert.end();
});

test.skip("abem(block, elem) can't be called with an additional identifier", assert => {
  const elem = abem("block", "elem");

  assert.throws(() => elem("what"));

  assert.end();
});

test("abem(block, elem, Object) returns the expected classname", assert => {
  const elem = abem("block", "elem");

  assert.equal(
    elem({ foo: true, bazQux: true, bar: 1 }),
    "block__elem -foo -bazQux -bar"
  );

  assert.end();
});

test("hyphens on kebab case modifiers", assert => {
  assert.equal(
    abem("block", ["----Foo-------Bar", "BAZ--Qux", "-DOM-Content-Loaded"]),
    "block -fooBar -BAZQux -DOMContentLoaded"
  );

  assert.end();
});

test("abem.join(...args)", assert => {
  assert.equal(
    abem.join("foo", false, "bar", undefined, "", "baz"),
    "foo bar baz"
  );

  assert.end();
});
