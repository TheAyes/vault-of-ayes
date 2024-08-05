---
tags:
- til
- typescript
- dependencies
- design-patterns
date-created: 28-06-2024
---

# Understanding Dependency Injection in TypeScript Projects

Dependency Injection (DI) is a software design pattern that deals with how components
get hold of their dependencies. At its core, dependency injection facilitates writing
code that's loosely coupled, modular, and easy to test and maintain.
Understanding the concept may seem challenging if you're new to it, but fear not.
We'll demystify dependency injection using code examples from my TypeScript project.

## What is Dependency Injection?

Dependency injection involves giving an object its dependencies instead of having it
construct them itself. It's a form of Inversion of Control (IoC)—the objects don't
create other objects on which they rely to perform their tasks; instead, they get the
instances from an outside source.
When you use dependency injection, this result's in code that's much easier to manage
and test.

## When to use Dependency Injection?

Dependency injection comes in handy in several scenarios:

- Sticking to the Single Responsibility Principle: If an object takes care of only
  initializing and using its own dependencies, this might violate the Single
  Responsibility Principle because the object is responsible for two different
  things. Dependency injection hands off the responsibility of initializing the
  dependency to someone else, so the object can focus solely on using the dependency.
- Testing: DI makes testing simpler by letting us provide mock dependencies during
  testing. That way, we can create lightweight, focused unit tests.
- Decoupling code: DI reduces the coupling between your classes, thereby making your
  application easier to modify.

## Dependency Injection in Action

Now let's explore an existing TypeScript project, which uses a package named
InversifyJS to handle DI.

```typescript
@injectable()
export class Config implements ICliConfig {
	/* ... code omitted for brevity ... */
	constructor(@inject("FileSystem") private fs: IFilesystem) {
	}

	/* ... code omitted for brevity ... */
}
```

In the above code, the @injectable() decorator is used to declare that Config is a
class into which dependencies can be injected. The @inject("FileSystem")
decorator passes the IFilesystem instance to the constructor parameter fs. In
other words, the Config class doesn't need to create an instance of
FileSystem. It is supplied (injected) with an instance when it is instantiated.

## Summary

This TypeScript project provides a practical demonstration of dependency injection.
Dependency injection is a useful design pattern that can help developers write more
modular, testable, and maintainable code. By understanding and leveraging DI, we can
create applications that are easier to develop and test. This, in turn, can lead to
higher-quality, more reliable software.