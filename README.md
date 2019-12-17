# foo-table

## Slots

- header
- footer
- no-results
- loading

```html
<template v-slot:header>HEADER</template>
```

### Events

- click:row | passing row 
- click:cell | passing cell
- expand:row | passing row 
- collapse:row | passing row 
- update:perPage | passing integer
- update:page | passing integer
- update:search | passing string
- update:sort | passing object of sort group

### v-model
```
rows that are selected
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
