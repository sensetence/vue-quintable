
# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.3.0] - 2023-01-09

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
