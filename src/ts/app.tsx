import QueryFilter from './app/queryFilter';
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Option, QueryFilterOption } from './types'
import loadOption from './loadOption'

interface Props {
  option: Option;
  save: (option: Option) => void;
}

interface State {
  option: Option;
}

class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      option: props.option,
    };
  }

  onOptionChanged = (key: string): (event: React.ChangeEvent<HTMLInputElement>) => void => {
    return (event) => {
      const value = event.target.checked;
      this.setState({
        ...this.state,
        option: {
          ...this.state.option,
          [key]: value,
        },
      });
    }
  }

  save = () => {
    this.props.save(this.state.option);
  }

  updateQueryFilterOption = (option: QueryFilterOption) => {
    this.setState({
      ...this.state,
      option: {
        ...this.state.option,
        queryFilter: option,
      }
    });
  }

  render() {
    const option = this.state.option;
    return <div>
      <h2>Option</h2>
      <table>
        <tbody>
          <tr>
            <td>Automatically decode URL Encode</td>
            <td>
              <input type="checkbox" checked={!!this.state.option.decodeUrlEncode} onChange={this.onOptionChanged('decodeUrlEncode')} />
            </td>
          </tr>
        </tbody>
      </table>
      <QueryFilter option={this.state.option.queryFilter} update={this.updateQueryFilterOption} />
      <hr />
      <button type="button" onClick={() => {this.save()}}>Save</button>
    </div>;
  }
}

function save(option: Option) {
  localStorage.setItem('option', JSON.stringify(option));
}

const option = loadOption();

ReactDOM.render(
  <App save={save} option={option} />,
  document.getElementById('app')
);
