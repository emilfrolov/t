import React, {Component} from 'react'
import store from '../modules/storage'

const phoneMask = (phone) => {
    var i, j, len, num, ref, res, val;

    res = '';

    num = phone.replace(/[^0-9]/g, '');

    num = '9' + num.slice(1);

    ref = num.replace(/[-\s]/gi, '');
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
        val = ref[i];
        res += val;
        if (i === 2) {
            res += ' ';
        }
        if (i === 5 || i === 7) {
            res += '-';
        }
    }
    return res.replace(/[^0-9]$/i, '');
};

const StrData = ({
    label,
    text,
    changeFunc
}) => (
    <div>
        <label>{label}</label>
        <input type="text" onChange={changeFunc} value={text}/>
    </div>
);

StrData.propTypes = {
    label: React.PropTypes.string,
    text: React.PropTypes.string,
    changeFunc: React.PropTypes.func
};

class Date extends Component {
    state = {
        year: 1900,
        month: 1,
        day: 1,
    };

    changeDay = (ev) => {
        const {day, month, year} = this.state;
        const val = ev.target.value;
        this.setState({
            day: val
        });

        this.props.changeDate(`${day}.${month}.${year}`);
    };

    changeMonth = (ev) => {
        const {day, month, year} = this.state;
        const val = ev.target.value;
        this.setState({
            month: val
        })
        this.props.changeDate(`${day}.${month}.${year}`);
    };

    changeYear = (ev) => {
        const {day, month, year} = this.state;
        const val = ev.target.value;
        this.setState({
            year: val
        })
        this.props.changeDate(`${day}.${month}.${year}`);
    };

    render() {
        const stringMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        const years = new Array(116);
        years.fill(1900);
        const days = new Array(31);
        days.fill(1);
        const month = new Array(12);
        month.fill(1);
        return (
            <div>
                <label>Год</label>
                <select onChange={this.changeYear}>
                    {years.map((val, i) =>
                        <option key={val+i} value={val + i}>{val + i}</option>
                    )}
                </select>
                <label>Месяц</label>
                <select onChange={this.changeMonth}>
                    {month.map((val, i) =>
                        <option key={val+i} value={val + i}>{stringMonth[0 + i]}</option>
                    )}
                </select>

                <label>День</label>
                <select onChange={this.changeDay}>
                    {days.map((val, i) =>
                        <option key={val+i} value={val + i}>{val + i}</option>
                    )}
                </select>
            </div>
        )
    }
}


class Control extends Component {
    state = {
        name: '',
        address: '',
        town: '',
        phone: '',
        date: ''
    };

    changeName = (ev) => {
        const val = ev.target.value.slice(0, 100);
        console.log(phoneMask(val))
        this.setState({
            name: val
        });
    };

    changeAddress = (ev) => {
        const address = ev.target.value;
        this.setState({
            address
        });
    };

    changeTown = (ev) => {
        const town = ev.target.value;
        this.setState({
            town
        });
    };

    changePhone = (ev) => {
        const phone = phoneMask(ev.target.value.slice(0, 13));
        this.setState({
            phone
        });
    };

    changeDate = (date) => {
        this.setState({
            date
        })
    };

    saveUser = () => {
        const {name, address, town, phone, date} = this.state;

        const state = store.getState();
        const users = state.users || [];

        if (name == '') return alert('Имя не должно быть пустым');
        if (address == '') return alert('Адрес не должно быть пустым');
        if (town == '') return alert('Город не должно быть пустым');
        if (phone == '') return alert('Телефон не должно быть пустым');
        if (date == '') return alert('Дата не должно быть пустым');

        store.update(Object.assign({}, state, {users: [...users, {id:name+address+town+phone+date, name, address, town, phone, date}]}));
    };

    render() {
        const {name, address, phone, town} = this.state;
        return (
            <div className="control">
                <StrData changeFunc={this.changeName} text={name} label='ФИО'/>
                <Date changeDate={this.changeDate}/>
                <StrData changeFunc={this.changeAddress} text={address} label='Адрес'/>
                <StrData changeFunc={this.changeTown} text={town} label='Город'/>
                <StrData changeFunc={this.changePhone} text={phone} label='Телефон'/>

                <button onClick={this.saveUser}>Сохранить</button>
            </div>
        )
    };
}
;

export default Control;