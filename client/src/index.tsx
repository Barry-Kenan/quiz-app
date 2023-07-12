import App from 'app/App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.scss';

const root = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

ReactDOM.render(root, document.getElementById('root'));
