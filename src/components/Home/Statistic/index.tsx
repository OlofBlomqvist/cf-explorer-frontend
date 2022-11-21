import { Col, Row } from "antd";
import React from "react";
import {
  AdaPriceIcon,
  CurentEpochIcon,
  DownRedIcon,
  LiveStakeIcon,
  MarketCapIcon,
  TotalADAStakeIcon,
  UpGreenIcon,
} from "../../../commons/resources";
import { formatCurrency, formatPrice } from "../../../commons/utils/helper";
import styles from "./index.module.scss";

interface Props {}

const HomeStatistic: React.FC<Props> = () => {
  const adaPrice = 1;

  return (
    <Row gutter={15} className={styles.statistic}>
      <Col span={24} sm={24} xl={{ span: 12, offset: 0 }}>
        <Row gutter={15}>
          <Col span={24} sm={12} lg={8}>
            <div className={styles.box}>
              <img className={styles.icon} src={AdaPriceIcon} alt="Ada Price" />
              <div className={styles.content}>
                <h4>Ada Price</h4>
                <h3>$0.4607</h3>
                <div className={styles.adaPrice}>
                  <small className={styles.priceValue}>0.0714 BTC</small>
                  <span className={styles.priceRate}>
                    <img src={adaPrice > 0 ? UpGreenIcon : DownRedIcon} alt="price rate" />
                    <small className={adaPrice > 0 ? styles.priceUp : styles.priceDown}>-10,24 %</small>
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={24} sm={12} lg={8}>
            <div className={styles.box}>
              <img className={styles.icon} src={MarketCapIcon} alt="Market cap" />
              <div className={styles.content}>
                <h4>Market cap</h4>
                <h3>${formatCurrency(15592559326)}</h3>
              </div>
            </div>
          </Col>
          <Col span={24} sm={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 0 }}>
            <div className={styles.box}>
              <img className={styles.icon} src={CurentEpochIcon} alt="Curent Epoch" />
              <div className={styles.content}>
                <h4>Curent Epoch</h4>
                <small>
                  Epoch: <small className={styles.epochValue}>361</small>
                  <br />
                  Slot: <small className={styles.epochValue}>{formatCurrency(325120)}</small>/{formatCurrency(432000)}
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={24} lg={{ span: 16, offset: 4 }} xl={{ span: 8, offset: 0 }}>
        <Row gutter={15}>
          <Col span={24} sm={12}>
            <div className={styles.box}>
              <img className={styles.icon} src={LiveStakeIcon} alt="Total ADA Stake" />
              <div className={styles.content}>
                <h4>Live Stake</h4>
                <h3>{formatPrice(20714000000)}</h3>
                <div className={styles.progress}>
                  <div className={styles.progressActive} style={{ width: "70%" }}>
                    {"70%"}
                  </div>
                  <div className={styles.progressPending} style={{ width: "30%" }}>
                    {"30%"}
                  </div>
                </div>
                <small>
                  Active Stake: <small className={styles.progressRate}>{formatPrice(25.09 * 10 ** 9)} </small> (0.7%)
                  <br />
                  Circulating supply: <small className={styles.progressRate}>{formatPrice(35.12 * 10 ** 9)}</small>{" "}
                  (78%)
                </small>
              </div>
            </div>
          </Col>
          <Col span={24} sm={12}>
            <div className={styles.box}>
              <img className={styles.icon} src={TotalADAStakeIcon} alt="Total ADA Stake" />
              <div className={styles.content}>
                <h4>Total ADA Stake</h4>
                <h3>{formatPrice(24770000000)}</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomeStatistic;
