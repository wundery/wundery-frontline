import React from 'react';
import { withTranslation } from 'globals';
// eslint-disable-next-line no-unused-vars
import css from '../styles/index.css';

class Cart extends React.Component {
  static propTypes = {
    // Translate helper
    t: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { t } = this.props;

    return (
      <div className="wundery-cart">
        {t('cart')}
      </div>
    );
  }
}

export default withTranslation('features.cart', 'containers.cart')(Cart);
