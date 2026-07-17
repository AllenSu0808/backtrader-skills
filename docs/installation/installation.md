---
source: https://www.backtrader.com/docu/installation/
fetched: 2026-07-17
title: "Installation"
---

# Installation

## Requirements and versions

`backtrader` is self-contained with no external dependencies (except if you want to plot)

Basic requirements are:

*   Python 2.7
    
*   Python 3.2 / 3.3/ 3.4 / 3.5
    
*   pypy/pypy3
    

Additional requirements if plotting is wished:

*   Matplotlib >= 1.4.1
    
    It may work with previous versions, but this the one used for development
    

**NOTE**: At the time of writing Matplotlib is not supported under _pypy/pypy3_

### Python 2.x/3.x compatibility

Development takes place under Python 2.7 and sometimes under 3.4. Tests are run locally with both versions.

Compatibility with 3.2 / 3.3 / 3.5 and pypy/pyp3 is checked with continuous integration under Travis

## Install from pypi

For example using pip:

```
pip install backtrader
```

_easy\_install_ with the same syntax can also be applied

## Install from pypi (including _matplotlib_)

Use this if plotting capabilities are wished:

```
pip install backtrader[plotting]
```

This pulls in matplotlib which will in turn pull in other dependencies.

Again you may prefer (or only have access to …) `easy_install`

## Install from source

First downloading a release or the latest tarball from the github site:

*   [https://github.com/mementum/backtrader](https://github.com/mementum/backtrader)

And after unpacking run the command:

```
python setup.py install
```

## Run from source in your project

Download a release or the latest tarball from the github site:

*   [https://github.com/mementum/backtrader](https://github.com/mementum/backtrader)

And then copy the _backtrader_ package directory to your own project. Under a Unix-like OS for example:

```
tar xzf backtrader.tgz
cd backtrader
cp -r backtrader project_directory
```

Remember that you would then need to manually install `matplotlib` for plotting.
