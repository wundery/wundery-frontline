import React from 'react';
import css from '../styles/index.css';
import { withTranslation } from 'globals';

class Cartbox extends React.Component {
  static propTypes = {
    // The wundery cart instance
    cart: React.PropTypes.object.isRequired,

    // Translate helper
    t: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { cart, t } = this.props;

    cart.log('Rendering cart');

    return (
      <div className="wundery-cart">
        {t('cart')}
      </div>
    )
  }
};

export default withTranslation('features.cartbox', 'containers.cartbox')(Cartbox);
