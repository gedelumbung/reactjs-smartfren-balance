import React, { Component, Fragment } from "react";
import get from "lodash/get";
import { IDX } from './constant';
import api from "./request";

class App extends Component {
  state = {
    main_balance: null,
    bonus: null,
    loading: false
  };

  requestSession = () => {
    this.setState({
      loading: true
    });
    return api()
      .post("/", { idx: IDX })
      .then(response => {
        const session_id = get(response, "data.session");
        this.requestBalance(session_id);
        this.requestBonus(session_id);
      });
  };

  requestBalance = sessionId => {
    return api()
      .post("/get_detail", { id: sessionId })
      .then(response => {
        this.setState({
          main_balance: response.data,
          loading: false
        });
      });
  };

  requestBonus = sessionId => {
    return api()
      .post("/get_bonus", { id: sessionId })
      .then(response => {
        this.setState({
          bonus: response.data,
          loading: false
        });
      });
  };

  componentDidMount() {
    this.requestSession();
  }

  render() {
    const { main_balance, bonus, loading } = this.state;
    const detail_paket = get(main_balance, "detail_paket");
    const benefit = get(main_balance, "benefit");
    const bonus_package = get(bonus, "paket_bonus");
    if (loading) {
      return (
        <Fragment>
          <div className="lds-facebook">
            <div />
            <div />
            <div />
          </div>
          <br />
          Loading...
        </Fragment>
      );
    }
    return (
      <Fragment>
        <h3>My Smartfren Balance</h3>
        <table width="500" className="redTable">
          <thead>
            <tr>
              <th>Nama Paket</th>
              <th>Jumlah</th>
              <th>Expired</th>
            </tr>
          </thead>
          <tbody>
            {detail_paket &&
              detail_paket.map((item, index) => {
                return <MainItem item={item} key={index} />;
              })}
            {benefit &&
              benefit.map((item, index) => {
                return <MainItem item={item} key={index} />;
              })}
            {bonus_package &&
              bonus_package.map((item, index) => {
                return <BonusItem item={item} key={index} />;
              })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const MainItem = ({ item }) => {
  return (
    <tr>
      <td>{item.benName}</td>
      <td>{item.benAmount}</td>
      <td>{item.benExpDate}</td>
    </tr>
  );
};

const BonusItem = ({ item }) => {
  return (
    <tr>
      <td>{item.bonusName}</td>
      <td>{item.bonusBalance}</td>
      <td>{item.packExpDate}</td>
    </tr>
  );
};

export default App;
