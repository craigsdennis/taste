# Taste
Run this over your codebase and produce a overview to share with others.

This is very, very rough at the moment.  t**AST**e, get it?

## Flavor Profiles
The idea is that you can run different flavor profiles to help define specific technology.

### counts
Gathers counts of matches

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

#### values
Pulls values from AST and produces a unique list of sorted values

Here is a snippet from [the flavor profile for imports](flavor_profiles/javascript/imports.json)

```json
{
    "name": "Imported",
    "values": [
        {
            "name": "external requires",
            "query": "call[callee=#require] str[value~=/^[^.]/]"
        },
```

And the results all require statements in the codebase that are external (do not start with a .)

```json
"Imported": {
        "values": {
            "external requires": [
                "fs",
                "glob",
                "grasp",
                "path"
            ],
```

## TODO
- [x] Support globs
- [ ] Add better ignoring
- [ ] Support multiple languages by pluggable Tasters for querying AST.
- [x] Allow profiles to specify taster, but fallback to the default.

## Contributing
Not quite yet...but if you are interested, give me a ping.