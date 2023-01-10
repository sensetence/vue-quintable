# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.2.0] - 2023-01-09

Updates for version 2.2.0

### Added
- expandedRowIcon as config property
- collapsedRowIcon as config property

### Changed
- default icon for collapsed rows changed from plus to chevron down
- default icon for expanded rows changed from minus to chevron up
- HTML-Structure and style of generated and sticky rows

### Fixed
- sticky rows are now calculated more properly


## [2.3.0] - 2023-01-10

Updates for version 2.3.0

### Added
- PortalVue for slots ([PortalVue](https://portal-vue.linusb.org/))

### Deprecated
- *quintable* option for cells was removed, use slot for nested tables.
- slot *cell-complete*. Still working but not recommended. Use only *cell-content*
- slot *generated-cell-complete*. Still working but not recommended. Use only *generated-cell-content*
- slot *sticky-cell-complete*. Still working but not recommended. Use only *sticky-cell-content*

### Changed
- slots *cell-complete* and *cell-content* now also working for generated and sticky cells

### Fixed
- class names


