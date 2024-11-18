## Rules

-   add/remove/modify existing code to achieve the end result (some code needs a refactor)
-   don't install additional packages
-   you need to use `zustand`, but it's up to you to decide what state should be global
-   write the code like it's a real feature

### Cards

-   add expand/collapse functionality
-   make sure the "Delete" button works
-   add animations

### Deleted Cards

-   display the number of deleted cards
-   reveal deleted cards after user clicks the "Reveal" button - deleted card variant shouldn't contain the description
-   write the code, so in the future you will be able to add "revert" functionality

### Behavior

-   cards by default should be collapsed
-   expanded/deleted cards' state needs to be persisted after "refreshing" (regardless of isVisible property)
-   "refresh" functionality needs to be implemented using `react-query`

### Miscellaneous

-   add a "Refresh" button (just like the "Reveal" button)
-   create generic `<ToggleButton />`

### Additional

You may leave a message explaining your coding choices, but it's not necessary.
Testing framework isn't installed, so instead just explain whether you think it's a good or bad idea to write tests for this feature or how to approach it.

## Code explanation

### Cards

-   I added expand/collapse functionality outside the `Card` component to keep it dumb component.
-   Same with "Delete" button. I also created global state for deleted cards.
-   I added basic animations based on css transitions.

### Deleted Cards

-   I display number of deleted cards by simply showing length of array of deleted cards.
-   I created boolean state for revealing and hiding deleted cards area. By toggling state, css classnames are changing.
-   By passing function to `handleDelete` prop it will be possible to add "revert" functionality in future.

### Behavior

-   Cards by default are collapsed
-   expanded/deleted cards state are persisted after refreshing
-   It is implemented by `react-query` refetch

Writing tests for this app is a good idea as they help prevent common mistakes, such as incorrectly implementing global state management or incorrect react-query states. Tests ensure that the application behaves as expected while improving its stability and maintainability in development process. Unit tests are useful for testing individual functions in isolation, such as verifying the correct results of a basic function like `shuffle` in `getListData.ts`. Integration tests, on the other hand, are important for checking how components and modules interact with each other, ensuring proper use of tools like zustand react-query. I recommend using Vitest, as it is specifically designed for Vite based environments.
