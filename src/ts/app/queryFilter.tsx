import * as React from 'react'
import { QueryFilterOption } from '../types'

interface Props {
  option: QueryFilterOption;
  update: (option: QueryFilterOption) => void;
}

interface State {
  option: QueryFilterOption;
  autoDeleteKeyInput: string;
}

class QueryFilter extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      option: {
        ...props.option,
        autoDeleteKeys: props.option.autoDeleteKeys || [],
      },
      autoDeleteKeyInput: '',
    }
  }

  addAutoDeleteKey = () => {
    const keys = this.state.option.autoDeleteKeys;
    const val = this.state.autoDeleteKeyInput;

    if (val) {
      this.setState({
        option: {
          autoDeleteKeys: Array.from(new Set([...keys, val])).sort(),
        },
        autoDeleteKeyInput: '',
      }, () => {
        this.props.update(this.state.option);
      });
    }
  }

  deleteAutoDeleteKey = (i: number) => {
    const copiedKeys = [...this.state.option.autoDeleteKeys];
    copiedKeys.splice(i, 1);

    this.setState({
      option: {
        autoDeleteKeys: copiedKeys,
      }
    }, () => {
      this.props.update(this.state.option);
    })
  }

  onTextInputChanged = (key: string): (event: React.ChangeEvent<HTMLInputElement>) => void => {
    return (event) => {
      const value = event.target.value;
      this.setState({
        ...this.state,
        autoDeleteKeyInput: value,
      });
    }
  }

  render() {
    const option = this.state.option;
    return <div>
      <h2>Query Filter</h2>
      <h3>Auto Delete</h3>
      <form>
        <input type="text" value={this.state.autoDeleteKeyInput} onChange={this.onTextInputChanged('autoDeleteKeyInput')} />
        <button type="button" onClick={() => {this.addAutoDeleteKey()}}>Add</button>
      </form>
      <table>
        <tbody>
          {
            option.autoDeleteKeys.map((key, index) => {
              return <tr>
                <td>{ key }</td>
                <td><button type="button" onClick={() => {this.deleteAutoDeleteKey(index)}}>Delete</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>;
  }
}

export default QueryFilter;
