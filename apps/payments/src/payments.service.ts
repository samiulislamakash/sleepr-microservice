import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-04-10',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ card, amount }: CreateChargeDto) {
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
