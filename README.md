# Cloudwell Debounce
A React component wrapper to delay the execution of certain events.

## How to install:
```powershell
npm i @cloudwell/debounce
```

## How to use:

This example will notify the consumer of the `SearchTextBox` component after each keystroke.
```typescript
export interface ISearchTextBoxProps {
  onSearchTextChanged: (e) => void;
}

const SearchTextBox: React.FC<ISearchTextBoxProps> = (props) => {
  
  const onSearchTextBoxChanged = (e) => {
    console.log("Search Text Changed!");
    props.onSearchTextChanged(e);
  }
  
  return <>
    <input onChange={onSearchTextBoxChanged} />
  </>;
}
export default SearchTextBox;
```

This example will only notify the consumer of the `SearchTextBox` component after the user has stopped typing for 500 milliseconds.
```typescript
import { Debounce } from '@cloudwell/debounce';

export interface ISearchTextBoxProps {
  onSearchTextChanged: (e) => void;
}

const SearchTextBox: React.FC<ISearchTextBoxProps> = (props) => {
  
  const onSearchTextBoxChanged = (e) => {
    console.log("Search Text Changed!");
    props.onSearchTextChanged(e);
  }
  
  return <Debounce events={[
      {
        // This is the name of the event to debounce on each child element.
        event: "onChange",
        
        // This is the number of milliseconds the event should on each child element should wait before firing.
        delay: 500
      }
    ]}>
    <input onChange={onSearchTextBoxChanged} />
  </Debounce>;
}
export default SearchTextBox;
```
