import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-04-10',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({
    card,
    amount,
    email,
  }: PaymentCreateChargeDto): Promise<any> {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });
    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   payment_method: paymentMethod.id,
    //   amount: amount * 100,
    //   confirm: true,
    //   payment_method_types: ['card'],
    //   currency: 'usd',
    // });

    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has complete successfully.`,
    });

    return {
      id: (Math.random() + 1).toString(36).substring(7),
      message: 'Payment successful',
    };

    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   amount: amount * 100,
    //   currency: 'usd',
    //   confirm: true,
    //   payment_method: 'pm_card_visa',
    //   automatic_payment_methods: { enabled: true },
    // });

    // return paymentIntent;
  }
}
