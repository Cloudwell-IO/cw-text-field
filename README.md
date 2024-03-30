# Cloudwell Debounce
A helper function to delay the execution of certain code.

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

  return <input onChange={onSearchTextBoxChanged} />;
}
export default SearchTextBox;
```

### Example: Search Text Box

This example will only notify the consumer of the `SearchTextBox` component after the user has stopped typing for 500 milliseconds.
```typescript
import { debounce } from '@cloudwell/debounce';

export interface ISearchTextBoxProps {
  onSearchTextChanged: (e) => void;
}

const SearchTextBox: React.FC<ISearchTextBoxProps> = (props) => {

  const onSearchTextBoxChanged = debounce((e) => {
    console.log("Search Text Changed!");
    props.onSearchTextChanged(e);
  }, 500)

  return <input onChange={onSearchTextBoxChanged} />;
}
export default SearchTextBox;
```

### Example: Controlled Search Text Box

This example will only notify the consumer of the `SearchTextBox` component after the user has stopped typing for 500 milliseconds but will allow the `SearchTextBox` to utilize the immediate event for updating the UI with each keystroke.
```typescript
import { debounce } from '@cloudwell/debounce';

export interface ISearchTextBoxProps {
  onSearchTextChanged: (e) => void;
}

const SearchTextBox: React.FC<ISearchTextBoxProps> = (props) => {

  const [searchText, setSearchText] = useState('');

  const onSearchTextBoxChanged = debounce(
    (e) => {
      console.log("Search Text Changed!");
      props.onSearchTextChanged(e);
    },
    500,
    (e) => {
      setSearchText(e.target.value);
    })

  return <input onChange={onSearchTextBoxChanged} value={searchText} />;
}
export default SearchTextBox;
```

## Implementation
### **debounce** function

|Parameter|Type|Default value|Description|
|:---|:---|:---|:---|
|**callback**|[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)|undefined|**Required**. The code to debounce.|
|**delay**|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|undefined|**Required**. The number of milliseconds to delay execution.|
|**immediate**|[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)|undefined|**Optional**. Code that is not debounced.|
