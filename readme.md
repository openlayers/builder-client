# OpenLayers Build Client

This is a client for the OpenLayers [build service](https://github.com/openlayers/builder).

When functional, I'll add instructions.  For now, this is a place for notes.

```
Info:

{
  symbols: Array.<Symbol>,
  defines: Array.<Define>,
  symbolIndex: {name -> index},
  definesIndex: {name -> index},
  groups: Array.<Group>
}

Symbol:

{
  name: string,
  description: string,
  kind: 'function|class|member',
  stability: 'experimental|stable'
}

Define:

{
  name: string,
  description: string,
  default: boolean
}

Class:

{
  name: string,
  description: string,
  methods: Array.<Symbol>
}

Group:

{
  name: string,
  description: string,
  classes: Array.<Class>,
  functions: Array.<Symbol>
}

State:

{
  info: Info,
  exports: {symbolName -> boolean},
  defines: {defineName -> boolean},
  expand: {name -> boolean}
}
```
