import React, {Component} from 'react'
import store from '../modules/storage'

class Results extends Component {
    static propTypes = {};

    deleteUser = (userModel) => () => {
        const state = store.getState();
        const users = state.users || [];

        const filteredUsers = users.filter(user => user.id !== userModel.id);

        store.update(Object.assign({}, state, {users: filteredUsers}));
    };

    render() {
        const {users = []} = this.props;

        return (
            <table style={{width: '100%'}}>
                <thead>
                <tr>
                    <td>Имя</td>
                    <td>Телефон</td>
                    <td>Адрес</td>
                    <td>Город</td>
                    <td>Дата рождения</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>{user.town}</td>
                        <td>{user.date}</td>
                        <td>
                            <button onClick={this.deleteUser(user)}>Удалить</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}

export default Results;