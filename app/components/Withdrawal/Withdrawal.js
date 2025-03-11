
'use client';
import { useState, useEffect } from 'react';
import styles from './Withdrawal.module.css';

const Withdrawal = () => {
  const [userData, setUserData] = useState({
    userId: '',
    amount: 0,
    upiId: '',
    cryptoAddress: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [inputUpiId, setInputUpiId] = useState('');
  const [inputCryptoAddress, setInputCryptoAddress] = useState('');

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('/data/user.json');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
        setInputUpiId(data.upiId || '');
        setInputCryptoAddress(data.cryptoAddress || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleAmountChange = (e) => {
    setWithdrawAmount(e.target.value);
  };

  const handleSaveUpiId = () => {
    setUserData(prev => ({ ...prev, upiId: inputUpiId }));
  };

  const handleSaveCryptoAddress = () => {
    setUserData(prev => ({ ...prev, cryptoAddress: inputCryptoAddress }));
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || isNaN(withdrawAmount) || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (parseFloat(withdrawAmount) > userData.amount) {
      alert('Insufficient balance');
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmWithdraw = () => {
    // Here we would process the withdrawal in a real app
    alert('Withdrawal confirmed!');
    setShowConfirmation(false);
  };

  if (loading) {
    return (
      <div className={styles.withdrawalContainer}>
        <div className={styles.loading}>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className={styles.withdrawalContainer}>
      <div className={styles.balanceSection}>
        <div className={styles.balanceAmount}>
          <span className={styles.currencySymbol}>$</span>
          {userData.amount.toFixed(2)}
        </div>
        <div className={styles.balanceLabel}>Your Balance</div>
      </div>

      {userData.amount < 5 ? (
        <div className={styles.insufficientBalance}>
          <div className={styles.insufficientIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className={styles.insufficientTitle}>Insufficient Balance</h3>
          <p className={styles.insufficientText}>
            You need at least $5.00 to make a withdrawal. Start creating and earning!
          </p>
          <button className={styles.createButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Start Sharing Content
          </button>
        </div>
      ) : (
        <div className={styles.withdrawalContent}>
          <div className={styles.methodSelection}>
            <div 
              className={`${styles.methodOption} ${selectedMethod === 'upi' ? styles.active : ''}`}
              onClick={() => handleMethodSelect('upi')}
            >
              <div className={styles.methodIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 9V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H15C16.1046 19 17 18.1046 17 17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 8L7 12L11 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              UPI (FIAT)
            </div>
            <div 
              className={`${styles.methodOption} ${selectedMethod === 'crypto' ? styles.active : ''}`}
              onClick={() => handleMethodSelect('crypto')}
            >
              <div className={styles.methodIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8H15M9 16H15M12 8V16M12 3V5M12 19V21M6 3L7 5M6 21L7 19M18 3L17 5M18 21L17 19M3 6L5 7M19 6L21 7M19 18L21 17M3 18L5 17M3 12H5M19 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              USDT (TRC20)
            </div>
          </div>

          {selectedMethod === 'upi' && (
            <div className={styles.settingsSection}>
              <div className={styles.settingsLabel}>UPI ID</div>
              <div className={styles.settingsInput}>
                <input 
                  type="text" 
                  value={inputUpiId} 
                  onChange={(e) => setInputUpiId(e.target.value)}
                  placeholder="Enter your UPI ID (e.g., user@upi)"
                />
                <button 
                  className={styles.saveButton}
                  onClick={handleSaveUpiId}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {selectedMethod === 'crypto' && (
            <div className={styles.settingsSection}>
              <div className={styles.settingsLabel}>USDT Address (TRC20)</div>
              <div className={styles.settingsInput}>
                <input 
                  type="text" 
                  value={inputCryptoAddress} 
                  onChange={(e) => setInputCryptoAddress(e.target.value)}
                  placeholder="Enter your USDT TRC20 address"
                />
                <button 
                  className={styles.saveButton}
                  onClick={handleSaveCryptoAddress}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {((selectedMethod === 'upi' && userData.upiId) || 
            (selectedMethod === 'crypto' && userData.cryptoAddress)) && (
            <div className={styles.amountSection}>
              <div className={styles.amountLabel}>Withdrawal Amount</div>
              <div className={styles.amountInput}>
                <span className={styles.amountPrefix}>$</span>
                <input 
                  type="number" 
                  value={withdrawAmount} 
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  min="1"
                  max={userData.amount}
                />
              </div>
              <button 
                className={styles.withdrawButton}
                onClick={handleWithdraw}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > userData.amount}
              >
                Withdraw
              </button>
            </div>
          )}

          <div className={styles.infoNotes}>
            <p>• Minimum withdrawal amount: $5.00</p>
            <p>• Withdrawals are processed within 24 hours</p>
            <p>• Transaction fee may apply based on method</p>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className={styles.confirmationOverlay}>
          <div className={styles.confirmationDialog}>
            <div className={styles.confirmationHeader}>
              <h3>WITHDRAWAL</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setShowConfirmation(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.confirmationContent}>
              Are you sure you want to withdraw ${parseFloat(withdrawAmount).toFixed(2)} using {selectedMethod === 'upi' ? 'UPI (FIAT)' : 'USDT (TRC20)'}?
            </div>
            <div className={styles.confirmationActions}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton}
                onClick={handleConfirmWithdraw}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
