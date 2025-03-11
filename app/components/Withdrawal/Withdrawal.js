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
  const [withdrawalAddress, setWithdrawalAddress] = useState('');

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
        setWithdrawalAddress(selectedMethod === 'upi' ? (data.upiId || '') : (data.cryptoAddress || ''));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Update withdrawal address when method changes
    setWithdrawalAddress(selectedMethod === 'upi' ? (userData.upiId || '') : (userData.cryptoAddress || ''));
  }, [selectedMethod, userData]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow values greater than or equal to 5 and not exceeding balance
    if (!value || (parseFloat(value) >= 5 && parseFloat(value) <= userData.amount)) {
      setWithdrawAmount(value);
    }
  };

  const handleAddressChange = (e) => {
    setWithdrawalAddress(e.target.value);
  };

  const validateWithdrawalAddress = (address) => {
    if (!address.trim()) return false;
    
    if (selectedMethod === 'upi') {
      // Basic UPI ID validation (username@provider format)
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      return upiRegex.test(address);
    } else if (selectedMethod === 'usdt') {
      // Basic TRC20 address validation (starts with T and has 34 chars)
      const trc20Regex = /^T[a-zA-Z0-9]{33}$/;
      return trc20Regex.test(address);
    }
    
    return false;
  };
  
  // Real-time validation for withdrawal address
  const isAddressValid = validateWithdrawalAddress(withdrawalAddress);

  const handleWithdraw = () => {
    // Amount validation
    if (!withdrawAmount || isNaN(withdrawAmount) || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    
    // Minimum amount check
    if (amount < 5) {
      alert('Minimum withdrawal amount is $5.00');
      return;
    }
    
    // Maximum amount check
    if (amount > userData.amount) {
      alert('Insufficient balance');
      return;
    }

    // Address validation
    if (!validateWithdrawalAddress(withdrawalAddress)) {
      alert(selectedMethod === 'upi' 
        ? 'Please enter a valid UPI ID (e.g., username@upi)' 
        : 'Please enter a valid TRC20 address (starts with T and has 34 characters)');
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmWithdraw = () => {
    // Here we would process the withdrawal in a real app
    // Also update the stored address
    if (selectedMethod === 'upi') {
      setUserData(prev => ({ ...prev, upiId: withdrawalAddress }));
    } else {
      setUserData(prev => ({ ...prev, cryptoAddress: withdrawalAddress }));
    }

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
          <span className={styles.currencySymbol}>$</span>{userData.amount.toFixed(2)}
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
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.09 9C9.57564 7.82831 10.695 7.0387 12 7.0387C13.305 7.0387 14.4244 7.82831 14.91 9C15.3956 10.1717 15.3956 11.8283 14.91 13C14.4244 14.1717 13.305 14.9613 12 14.9613C10.695 14.9613 9.57564 14.1717 9.09 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              USDT (TRC20)
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Withdrawal Address:</label>
            <input
              type="text"
              value={withdrawalAddress}
              onChange={handleAddressChange}
              placeholder={selectedMethod === 'upi' ? "e.g., user@upi" : "e.g., TRC20 wallet address"}
              className={`${styles.inputField} ${withdrawalAddress && !isAddressValid ? styles.invalidInput : ''}`}
            />
            {withdrawalAddress && !isAddressValid && (
              <div className={styles.errorMessage}>
                {selectedMethod === 'upi' 
                  ? 'Please enter a valid UPI ID (e.g., username@upi)' 
                  : 'Please enter a valid TRC20 address (starts with T and has 34 characters)'}
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Enter Amount:</label>
            <div className={styles.amountInput}>
              <input
                type="number"
                value={withdrawAmount}
                onChange={handleAmountChange}
                placeholder={`Min: $5.00, Max: $${userData.amount.toFixed(2)}`}
                min="5"
                max={userData.amount}
                step="0.01"
                onBlur={(e) => {
                  // Format to two decimal places on blur
                  if (e.target.value && !isNaN(e.target.value)) {
                    setWithdrawAmount(parseFloat(e.target.value).toFixed(2));
                  }
                }}
              />
            </div>
            {withdrawAmount && (
              <>
                {parseFloat(withdrawAmount) < 5 && (
                  <div className={styles.errorMessage}>
                    Minimum withdrawal amount is $5.00
                  </div>
                )}
                {parseFloat(withdrawAmount) > userData.amount && (
                  <div className={styles.errorMessage}>
                    Amount exceeds your available balance
                  </div>
                )}
                {selectedMethod === 'upi' && parseFloat(withdrawAmount) >= 5 && parseFloat(withdrawAmount) <= userData.amount && (
                  <div className={styles.inrEstimate}>
                    Estimated INR: ₹{(parseFloat(withdrawAmount) * 87).toFixed(2)}
                    <span className={styles.inrRate}>(Rate: ₹87 per $)</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className={styles.infoNotes}>
            <p>• Minimum withdrawal: $5.00</p>
            <p>• Processing time: 24-48 hours</p>
          </div>

          <button 
            className={styles.withdrawButton}
            onClick={handleWithdraw}
            disabled={
              !withdrawAmount || 
              parseFloat(withdrawAmount) < 5 || 
              parseFloat(withdrawAmount) > userData.amount || 
              !withdrawalAddress.trim() ||
              !isAddressValid
            }
          >
            Withdraw Funds
          </button>
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
              <p>Are you sure you want to withdraw ${parseFloat(withdrawAmount).toFixed(2)} using {selectedMethod === 'upi' ? 'UPI (FIAT)' : 'USDT (TRC20)'} to:</p>
              <div className={styles.confirmationAddress}>{withdrawalAddress}</div>
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