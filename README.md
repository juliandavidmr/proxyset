# proxyset

Toolkit for setting up the github proxy

## Why?

In some cases, it is necessary to configure the proxy for programs installed on a computer, such as _yarn_, _git_, and _npm_. This generates considerable time expenditure on Stackoverflow searches and the official documentation of these. `proxyset` solves this quickly with just a few steps, allowing you to configure _yarn_, _git_ and _npm_ with minimal configuration.

## Usage

> Development mode: _Not yet available in npmjs_

### **Git**

Quickly set up git proxy:

```bash
node index.js e -g

# prompt: host:  the.host.com.co
# prompt: port:  8080
# prompt: username:  user.name
# prompt: password:  the.pass
#
# Git proxy removed!
```

#### **Remove proxy**

```bash
node index.js d -g
```

#### **See proxy**

```bash
node index.js -gv
```

Quickly set up yarn proxy:

```bash
# under construction
```

Quickly set up npm proxy:

```bash
# under construction
```

### Commands

| Options |         Detail      |
|---------|---------------------|
| enable  | Enable proxy        |
| disable | Disable proxy       |

### Options

| Options |         Detail      | Type | Default |
|---------|---------------------|------|---------|
| auth    | Use authentication  | Bool | true    |
| npm     | Set npm proxy       | None |         |
| yarn    | Set yarn proxy      | None |         |
| git     | Set git proxy       | None |         |
| view    | View data proxy     | None |         |

License MIT