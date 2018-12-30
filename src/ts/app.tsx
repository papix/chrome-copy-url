import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Options } from './types'

interface Props {
  options: Options;
  save: (options: Options) => void;
}

interface State {
  options: Options;
}

class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      options: props.options,
    };
  }

  onOptionChanged = (key: string): (event: React.ChangeEvent<HTMLInputElement>) => void => {
    return (event) => {
      const value = event.target.checked;
      this.setState({
        options: {
          ...options,
          [key]: value,
        },
      });
    }
  }

  save = () => {
    this.props.save(this.state.options);
  }

  render() {
    return <div>
      <h2>Option</h2>
      <table>
        <tbody>
          <tr>
            <td>Automatically decode URL Encode</td>
            <td>
              <input type="checkbox" checked={!!this.state.options.decodeUrlEncode} onChange={this.onOptionChanged('decodeUrlEncode')} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={() => {this.save()}}>Save</button>
    </div>;
  }
}

function save(options: Options) {
  localStorage.setItem('options', JSON.stringify(options));
}

const options: Options = JSON.parse(localStorage.getItem('options') || '{}');

ReactDOM.render(
  <App save={save} options={options} />,
  document.getElementById('app')
);
