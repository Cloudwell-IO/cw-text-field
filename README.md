# Cloudwell Debounce
A React component wrapper to delay the execution of certain events.

## How to install:
```powershell
npm i @cloudwell/debounce
```

## How to use:

### Basic Search Text Box

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

### Example: Search Text Box

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

### Example: Controlled Search Text Box

This example will only notify the consumer of the `SearchTextBox` component after the user has stopped typing for 500 milliseconds but will allow the `SearchTextBox` to utilize the immediate event for updating the UI.
```typescript
import { Debounce } from '@cloudwell/debounce';

export interface ISearchTextBoxProps {
  onSearchTextChanged: (e) => void;
}

const SearchTextBox: React.FC<ISearchTextBoxProps> = (props) => {

  const [searchText, setSearchText] = useState('');

  const onSearchTextBoxChanged = (e) => {
    console.log("Search Text Changed!");
    props.onSearchTextChanged(e);
  }

  return <Debounce events={[
      {
        // This is the name of the event to debounce on each child element.
        event: "onChange",

        // This is the number of milliseconds the event should on each child element should wait before firing.
        delay: 500,

        // This is an optional event handler that is not debounced and can be used to update the value of a controlled input element.
        handler: (e) => {
          setSearchText(e.target.value);
        }
      }
    ]}>
    <input onChange={onSearchTextBoxChanged} value={searchText} />
  </Debounce>;
}
export default SearchTextBox;
```

### Alternate Notations

This example demonstrates the use of the `IDebounceEvents` variation of the `events` property on the `Debounce` component to achieve the same functionality in the [Example Search Text Box](#example-search-text-box).

```typescript
<Debounce events={{ onChange: 500 }}>
  /* Ommitted  */
</Debounce>;
```

This example demonstrates the use of the `IDebounceEvents` variation of the `events` property on the `Debounce` component to achieve the same functionality in the [Example Search Text Box](#example-controlled-search-text-box).

```typescript
<Debounce events={{
      onChange: 500,
      onChangeImmediate: (e) => { /* TODO: use the event data to ensure the rendered UI is correct. */ }
    }}>
  /* Ommitted  */
</Debounce>;
```

## Implementation
### IDebounceProps interface

|Name|Type|Default value|Description|
|:---|:---|:---|:---|
|**events**|IDebounceEvent[] \| IDebounceEvents||**Required**. The name of the event to debounce.|

### IDebounceEvent interface

|Name|Type|Default value|Description|
|:---|:---|:---|:---|
|**event**|string||**Required**. The list of events to debounce.|
|**delay**|number||**Required**. The number of milliseconds to wait before invoking the event handler.|
|**handler**|CallableFunction|undefined|The event handler to invoke immediately when each event occurs. The debounced event handler will still be invoked after the delay.|

### IDebounceEvents interface

|Name|Type|Default value|Description|
|:---|:---|:---|:---|
|**[key: string]**|number \| CallableFunction||The key can either be the name of an event to debounce or the name of an event to debounce followed by the word "Immediate" (i.e. onChangeImmediate). If the key is the name of an event to debounce, then the value must be the number of milliseconds to wait before invoking the event handler. If the key is the name of an event to debounce followed by the word "Immediate", then the value must be a CallableFunction that matches the event handler signature to be called immediately when each event occurs. The debounced event handler will still be invoked after the delay.|
