<!-- @format -->

# ⚠️ DEPRECATED

**This package (`mui-toolpad-extended-tuni`) is deprecated.**

Please use `@mui-toolpad-extended-tuni/main` instead.

## Migration Guide

### 1. Update your package.json

```bash
npm uninstall mui-toolpad-extended-tuni
npm install @mui-toolpad-extended-tuni/main
```

Or update your `package.json`:

```json
{
  "dependencies": {
    "@mui-toolpad-extended-tuni/main": "^3.4.0"
  }
}
```

### 2. Update all imports

```typescript
// Old (deprecated)
import { ToolpadProvider } from 'mui-toolpad-extended-tuni';
import { useNavigationStore } from 'mui-toolpad-extended-tuni';

// New
import { ToolpadProvider } from '@mui-toolpad-extended-tuni/main';
import { useNavigationStore } from '@mui-toolpad-extended-tuni/main';
```

### 3. Update extension package peer dependencies

If you're using extension packages (calendar, courses, users), update their peer dependencies:

```json
{
  "peerDependencies": {
    "@mui-toolpad-extended-tuni/main": "^3.4.0"
  }
}
```

## What Changed?

The main package has been moved to `@mui-toolpad-extended-tuni/main` to align with the organization scope structure. All other packages (`@mui-toolpad-extended-tuni/core`, `@mui-toolpad-extended-tuni/calendar`, etc.) already use the scoped naming.

## Backward Compatibility

This package (`mui-toolpad-extended-tuni`) will continue to work by re-exporting everything from `@mui-toolpad-extended-tuni/main`. However:

- **No new features** will be added to this package
- **Only critical security updates** will be provided
- **All new development** happens in `@mui-toolpad-extended-tuni/main`

## Timeline

- **v3.2.0**: Package deprecated, migration to `@mui-toolpad-extended-tuni/main` recommended
- **v4.0.0**: This package may be removed entirely (TBD)

## Need Help?

- See the [main package README](../packages/main/README.md) for full documentation
- Check the [GitHub repository](https://github.com/Jalez/mui-toolpad-extended-tuni) for issues and discussions

---

# MUI Toolpad Extended Library (TUNI)

A React library extending MUI Toolpad functionality with additional features for educational applications. This library provides components and tools for building interactive educational interfaces.

## Installation

**⚠️ Use the new scoped package:**

```bash
npm install @mui-toolpad-extended-tuni/main
```

See [packages/main/README.md](../packages/main/README.md) for complete documentation.

## Package Structure

- **`@mui-toolpad-extended-tuni/core`**: Core shared dependencies (Events, Navigation, Common UI components)
- **`@mui-toolpad-extended-tuni/main`**: Main package (ToolpadProvider, LMS components, platform features) ⭐ **Use this**
- **`@mui-toolpad-extended-tuni/calendar`**: Calendar microservice (optional)
- **`@mui-toolpad-extended-tuni/courses`**: Courses microservice (optional)
- **`@mui-toolpad-extended-tuni/users`**: Users microservice (optional)

## License

MIT License - See LICENSE file for details.
