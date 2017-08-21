# Taste
Run this over your codebase and produce a overview to share with others.

This is very, very rough at the moment.

## Flavor Profiles
The idea is that you can run different flavor profiles to help define specific technology.

For instance here is a snippet `profiles/javascript/es2015.json`

```json
{
    "counts": [
        {
            "name": "Array.prototype.forEach usage",
            "query": "call[callee=member[prop=#forEach]]"
        }
    ]
}
```
