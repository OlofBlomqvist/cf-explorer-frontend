import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../commons/resources/images/Wallet.png";
import sendImg from "../../../commons/resources/images/summary-up.png";
import receiveImg from "../../../commons/resources/images/summary-down.png";
import AIconImg from "../../../commons/resources/images/AIcon.png";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";

interface CollateralProps {
  data: Transaction["collaterals"] | null;
}

const Collaterals: React.FC<CollateralProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>Wallet Addresses</div>
        <div>Amount</div>
      </div>
      {data && data.map((item, key) => <Items item={item} key={key} type="down" />)}
    </div>
  );
};

export default Collaterals;

const Items = ({ item, type }: { item?: Required<Transaction>["collaterals"][number]; type?: "up" | "down" }) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <img className={styles.img} src={walletImg} alt="wallet icon" />
        <div>
          From: <span className={styles.address}>{getShortWallet(item?.address || "")}</span>{" "}
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
          {item?.txHash || ""}
          {/* To Do: check lại icon khi copy cái khác thì hoàn trả icon cũ */}
          {state.value === item?.txHash ? (
            <BiCheckCircle size={20} className={styles.icon} />
          ) : (
            <IoMdCopy size={20} className={styles.icon} onClick={() => copyToClipboard(item?.txHash || "")} />
          )}
        </div>
        <div>
          <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
            {type === "down" ? `- ${formatADA(item?.amount)}` : `+ ${formatADA(item?.amount)}`}
          </span>
          <img src={AIconImg} alt="ADA icon" />
        </div>
      </div>
    </div>
  );
};
