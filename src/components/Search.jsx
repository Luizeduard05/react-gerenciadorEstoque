import "./Search.css"

const Search = ({setBusca}) => {

  return (
    <div>
      <div className='search-container'>
        <input
          type="text"
          placeholder='Digite o nome do produto'
          onChange={(e) => setBusca(e.target.value)}
          className='input-search'
        />
      </div>
    </div>
  )
}

export default Search