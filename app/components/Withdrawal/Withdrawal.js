
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
  const [addressSaved, setAddressSaved] = useState(false);

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
        setAddressSaved(!!data.upiId || !!data.cryptoAddress);
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
    setAddressSaved(method === 'upi' ? !!userData.upiId : !!userData.cryptoAddress);
  };

  const handleAmountChange = (e) => {
    setWithdrawAmount(e.target.value);
  };

  const handleSaveUpiId = () => {
    setUserData(prev => ({ ...prev, upiId: inputUpiId }));
    setAddressSaved(true);
  };

  const handleSaveCryptoAddress = () => {
    setUserData(prev => ({ ...prev, cryptoAddress: inputCryptoAddress }));
    setAddressSaved(true);
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              UPI (FIAT)
            </div>
            <div 
              className={`${styles.methodOption} ${selectedMethod === 'usdt' ? styles.active : ''}`}
              onClick={() => handleMethodSelect('usdt')}
            >
              <div className={styles.methodIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              USDT (TRC20)
            </div>
          </div>

          {selectedMethod === 'upi' && (
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>{addressSaved ? 'Withdrawal Address:' : 'Enter UPI ID:'}</label>
              <input
                type="text"
                value={inputUpiId}
                onChange={(e) => setInputUpiId(e.target.value)}
                placeholder="e.g., user@upi"
                className={styles.inputField}
              />
              <div className={styles.saveButtonContainer}>
                <button 
                  className={styles.saveButton}
                  onClick={handleSaveUpiId}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {selectedMethod === 'usdt' && (
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>{addressSaved ? 'Withdrawal Address:' : 'Enter USDT Address:'}</label>
              <input
                type="text"
                value={inputCryptoAddress}
                onChange={(e) => setInputCryptoAddress(e.target.value)}
                placeholder="e.g., TRC20 wallet address"
                className={styles.inputField}
              />
              <div className={styles.saveButtonContainer}>
                <button 
                  className={styles.saveButton}
                  onClick={handleSaveCryptoAddress}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          
          {addressSaved && (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Enter Amount:</label>
                <div className={styles.amountInput}>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className={styles.infoNotes}>
                <p>• Minimum withdrawal: $5.00</p>
                <p>• Processing time: 24-48 hours</p>
              </div>

              <button 
                className={styles.withdrawButton}
                onClick={handleWithdraw}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > userData.amount}
              >
                Withdraw Funds
              </button>
            </>
          )}
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
