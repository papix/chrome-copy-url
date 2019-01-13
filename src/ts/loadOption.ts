import { Option, QueryFilterOption } from './types'

export default function loadOption() : Option {
  const loadedOption = JSON.parse(localStorage.getItem('option') || '{}');
  const option: Option = {
    ...loadedOption,
    queryFilter: {
      ...loadedOption.queryFilter
    },
  }
  return option;
}
