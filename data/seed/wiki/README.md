# Seed Data: Wiki

Very crude extraction of all items from a [Fandom](https://www.fandom.com/) pages collection.

```javascript
let yaml = "";
document.querySelectorAll(".category-page__members li > a").forEach((item) => {
  s += `
  - name: "${item.text}"
    url: "${item.href}"`;
});
console.log(yaml);
```
