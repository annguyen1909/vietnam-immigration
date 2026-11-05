const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const ts = require('typescript');

function renderForm(props = {}, status = 'idle') {
  const source = readFileSync(resolve(__dirname, '../src/components/ui/ContactForm.tsx'), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });
  const module = { exports: {} };
  const react = {
    ...React,
    useState: (initial) => React.useState(initial === 'idle' ? status : initial),
  };
  const localRequire = (name) => (name === 'react' ? react : require(name));
  new Function('require', 'module', 'exports', outputText)(localRequire, module, module.exports);
  return renderToStaticMarkup(React.createElement(module.exports.default, props));
}

test('contact form integrates into the page without a second card or heading', () => {
  const html = renderForm();
  assert(!html.includes('shadow-xl'));
  assert(!html.includes('bg-gradient-to-r'));
  assert(!html.includes('<h2'));
  for (const field of ['fullName', 'email', 'phone', 'subject', 'message']) {
    const tag = html.match(new RegExp(`<(?:input|select|textarea)[^>]*name="${field}"[^>]*>`))?.[0];
    assert(tag, field);
    assert(tag.includes('required=""'), field);
    const id = tag.match(/id="([^"]+)"/)?.[1];
    assert(id && html.includes(`for="${id}"`), `${field}: accessible label`);
  }
  assert.match(html, /aria-label="Country calling code"/);
  assert.match(html, /autocomplete="email"/i);
});

test('sidebar form retains its card and compact question fields', () => {
  const html = renderForm({ variant: 'sidebar' });
  assert.match(html, /shadow-xl/);
  assert.match(html, /Send Us a Message/);
  assert.match(html, /Your Question/);
  assert.match(html, /rows="3"/);
  assert(!html.includes('name="subject"'));
});

test('sending state disables submit and exposes busy feedback', () => {
  const html = renderForm({}, 'loading');
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /<button[^>]*disabled=""/);
  assert.match(html, /Sending message…/);
});

test('delivery feedback is announced to assistive technology', () => {
  assert.match(renderForm({}, 'success'), /role="status"/);
  assert.match(renderForm({}, 'error'), /role="alert"/);
});
