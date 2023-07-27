import { ConfigProvider } from 'antd';
import App from 'app/App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.scss';

const root = (
	<BrowserRouter>
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Roboto'
				}
			}}
		>
			<App />
		</ConfigProvider>
	</BrowserRouter>
);

ReactDOM.render(root, document.getElementById('root'));
