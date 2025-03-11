
'use client';
import { useState } from 'react';
import styles from './Withdrawal.module.css';

const Withdrawal = ({ balance = 1000, onClose }) => {
  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [savedUpiId, setSavedUpiId] = useState('');
  const [savedCryptoAddress, setSavedCryptoAddress] = useState('');

  const handleSaveSettings = () => {
    if (method === 'upi' && upiId) {
      setSavedUpiId(upiId);
    } else if (method === 'usdt' && cryptoAddress) {
      setSavedCryptoAddress(cryptoAddress);
    }
  };

  const handleAmountChange = (e) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleWithdraw = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (amountNum > balance) {
      alert('Insufficient balance');
      return;
    }
    
    setShowConfirmation(true);
  };

  const confirmWithdrawal = () => {
    alert('Withdrawal confirmed');
    setShowConfirmation(false);
    if (onClose) onClose();
  };

  const cancelWithdrawal = () => {
    setShowConfirmation(false);
  };

  const isSettingsSaved = (method === 'upi' && savedUpiId) || (method === 'usdt' && savedCryptoAddress);

  return (
    <div className={styles.withdrawalContainer}>
      <div className={styles.balanceSection}>
        <h3>Your Balance</h3>
        <div className={styles.balanceAmount}>{balance} <span>units</span></div>
      </div>

      <div className={styles.methodSelection}>
        <button 
          className={`${styles.methodButton} ${method === 'upi' ? styles.active : ''}`}
          onClick={() => setMethod('upi')}
        >
          UPI (FIAT)
        </button>
        <button 
          className={`${styles.methodButton} ${method === 'usdt' ? styles.active : ''}`}
          onClick={() => setMethod('usdt')}
        >
          USDT (TRC20)
        </button>
      </div>

      <div className={styles.settingsSection}>
        {method === 'upi' ? (
          <div className={styles.upiSettings}>
            <h4>UPI Settings</h4>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter UPI ID (e.g., user@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className={styles.input}
              />
              <button 
                onClick={handleSaveSettings}
                disabled={!upiId}
                className={styles.saveButton}
              >
                Save
              </button>
            </div>
            {savedUpiId && (
              <div className={styles.savedSetting}>
                Current UPI ID: <span>{savedUpiId}</span>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.usdtSettings}>
            <h4>USDT Settings</h4>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter USDT (TRC20) Address"
                value={cryptoAddress}
                onChange={(e) => setCryptoAddress(e.target.value)}
                className={styles.input}
              />
              <button 
                onClick={handleSaveSettings}
                disabled={!cryptoAddress}
                className={styles.saveButton}
              >
                Save
              </button>
            </div>
            {savedCryptoAddress && (
              <div className={styles.savedSetting}>
                Current USDT Address: <span>{savedCryptoAddress}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {isSettingsSaved && (
        <div className={styles.amountSection}>
          <h4>Withdrawal Amount</h4>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              className={styles.input}
            />
            <button 
              onClick={handleWithdraw}
              disabled={!amount}
              className={styles.withdrawButton}
            >
              Withdraw
            </button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className={styles.overlay}>
          <div className={styles.confirmationDialog}>
            <div className={styles.dialogHeader}>
              <h3>WITHDRAWAL</h3>
              <button 
                className={styles.closeButton}
                onClick={cancelWithdrawal}
              >
                ✕
              </button>
            </div>
            <div className={styles.dialogContent}>
              <p>
                Are you sure you want to withdraw <strong>{amount}</strong> units using{' '}
                <strong>{method === 'upi' ? 'UPI (FIAT)' : 'USDT (TRC20)'}</strong>?
              </p>
              <div className={styles.dialogButtons}>
                <button 
                  className={styles.cancelButton}
                  onClick={cancelWithdrawal}
                >
                  Cancel
                </button>
                <button 
                  className={styles.confirmButton}
                  onClick={confirmWithdrawal}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
