# Taste
Run this over your codebase and produce a overview to share with others.

This is very, very rough at the moment.  t**AST**e, get it?

## Flavor Profiles
The idea is that you can run different flavor profiles to help define specific technology.

### counts
Here is a snippet from [the flavor profile for es6](flavor_profiles/javascript/es6.json)

```json
{
    "name": "es6 usage",
    "counts": [
        {
            "name": "forEach",
            "query": "call[callee=member[prop=#forEach]]"
        },
```

And JSON will produced from running over a codebase using that profile.  Counts will gather and count occurrences of matching nodes across files.

```json
{
  "es6 usage": {
    "counts": {
      "forEach": 4,
```

## TODO
- [x] Support globs
- [ ] Add better ignoring
- [ ] Support multiple languages by pluggable Tasters for querying AST.
- [ ] Allow profiles to specify taster, but fallback to the default.

## Contributing
Not quite yet...but if you are interested, give me a ping.