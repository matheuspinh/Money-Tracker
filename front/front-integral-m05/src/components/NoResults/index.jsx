import NoResultsImage from '../../assets/no-results-image.svg';
import './styles.css';

function NoResults() {
  return (
    <tr className='noResults-area'>
      <td className='noResults'>
        <img src={NoResultsImage} alt="Sem Resultados na Pesquisa" />
        <h2>Nenhum resultado foi encontrado!</h2>
        <h3>Verifique se escrita está correta</h3>
      </td>
    </tr>
  )
};

export default NoResults;