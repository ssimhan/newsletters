---
source: substack
title: Who Owns Pricing?
url: 'https://substack.gauravvohra.com/p/who-owns-pricing'
date: '2026-02-24'
author: Gaurav Vohra
transcript: false
---
_Foreword from_ :

_If you’re in product or growth you should own pricing. But most of you don’t._

_Your architecture is why, and it’s slowing you down._

_This guest post is from [Fynn Glover](https://www.linkedin.com/in/fynn-glover-b0410015/), Founder & CEO of [Schematic](https://schematichq.com/?utm_source=gauravnewsletter&utm_medium=newsletter&utm_campaign=book202602&utm_content=schematic), from his book: **You’re Leaving Money on the Table**._

_To get the full_ _book, [click here](https://schematichq.com/book?utm_source=gauravnewsletter&utm_medium=newsletter&utm_campaign=book202602&utm_content=schematic) (online) or [click here](https://www.amazon.com/dp/B0G545Y16J) (print)._

_**Price is a number; pricing is an architecture  
**from You’re Leaving Money on the Table  
by **[fynn glover](https://open.substack.com/users/330574-fynn-glover?utm_source=mentions)**_

Are you responsible for pricing?

This was me at Automox. Running growth. Mandate to change pricing.

I literally couldn’t. Couldn’t even roll out a new tier for 6 months. Didn’t understand why until I investigated the architecture deeply and started to understand the systems that govern it all.

That’s when I realized the business had no ability to pull these levers.

Does this sound familiar?

As [Andrew Morris](https://www.linkedin.com/in/andrew---morris), CEO of GreyNoise said:

> A SaaS company should be able to define an offering by config and have the following flow all the way through to all technologies: offering name, features available, usage quotas, rate limits, seats, and pricing/billing info.
> 
> This should be defined once and inherited everywhere.
> 
> This is not doable at the moment for any SaaS company.

[Jalal Iftikhar](https://www.linkedin.com/in/jalal-iftikhar/), who leads Business Technology at Notion says:

> The real issue is the inability to slice and dice offerings, iterate, and learn.
> 
> The commercial tinkerers who want to constantly work on product monetization don’t have the tools to test and learn.

They’re right. The problem is our architectural foundation.

At my last company, our monetization stack was a complex web:

*   Stripe for self-serve billing
    
*   NetSuite for enterprise billing
    
*   Amplitude for product usage analytics
    
*   Salesforce for our pricebook
    
*   Salesforce CPQ for our _second_ pricebook
    
*   Hard-coded entitlements tightly coupled with plan IDs
    
*   A home-grown metering system nobody trusted
    
*   Gainsight for customer success management
    

[

![](https://substackcdn.com/image/fetch/$s_!jHVp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa2484e52-3938-47ce-ab01-85f03485e0a7_3534x1856.png)



](https://substackcdn.com/image/fetch/$s_!jHVp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa2484e52-3938-47ce-ab01-85f03485e0a7_3534x1856.png)

A half-dozen disconnected systems, each serving as a different, conflicting source of truth. Thousands of lines of hard-coded billing logic.

Different teams thought they were managing monetization, but in reality, no one owned it. No one _could_ own it.

A tier launch took six months; an add-on initiative was abandoned entirely.

This isn’t an engineering problem, nor is it a product or GTM problem.

It’s an entire business problem.

[Drew Laxton](https://www.linkedin.com/in/drew-laxton/), the CFO of Outreach, described the challenge this way:

> Consumption pricing starts in the product. Then it needs to populate an order form. That needs to feed back into Salesforce. How do you manage and forecast the pipeline for a product like this?

The choke point starts in the product: how it’s fulfilled, provisioned, consumed, gated, packaged, and priced.

Thanks for reading Growth by Gaurav! Subscribe for free to receive new posts and support my work.

## The Root of Complexity

Most companies make the same two mistakes.

First, they hardcode product entitlements. This makes it difficult to support customer exceptions and evolve pricing & packaging as your product matures. It demands that engineering has to support all monetization changes, no matter how tiny.

Second, they end up with multiple product catalogs, each of which is a source of truth for different teams. The CRO looks at the CRM. The CFO looks at the billing system. The CTO looks at the database. Changes to pricing & packaging require changes everywhere.

It’s understandable how this happens. Early on, it’s easy to hardcode and move on. People rarely make time to invest in architectural coherence.

That is, until they’re forced to.

At our Monetizing AI Summit, [Shar Dara](https://www.linkedin.com/in/darafsheh/), who leads billing at Vercel, put it bluntly:

> Traditional SaaS companies updated pricing once a year. In the AI era, that’s impossible.
> 
> At Vercel, we average **five to six pricing changes per month**: new SKUs, add-ons, packaging tweaks.
> 
> You need architecture that can keep up.

[Ben Papillon](https://www.linkedin.com/in/benjaminpapillon/), Schematic’s CTO, added:

> If pricing agility is important, you need an architecture that lets you change how you price without rewriting your product.

## The Four Pillars of Modern Pricing Architecture

The solution that Shar and Ben outlined is a decoupled, four-part architecture.

### **Pillar 1: Unified Product Catalog**

A single schema describing every plan, feature, entitlement, and price, as the canonical source for billing, provisioning, analytics, and GTM.

This single catalog ensures that changes appear everywhere, instantly.

[

![](https://substackcdn.com/image/fetch/$s_!bzYB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F290e9df2-dce7-4a32-a283-5400609daf4d_1536x1024.png)



](https://substackcdn.com/image/fetch/$s_!bzYB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F290e9df2-dce7-4a32-a283-5400609daf4d_1536x1024.png)

### **Pillar 2: Decoupled Entitlements**

The heart of agility is to decouple pricing logic from code. Instead, feature access rules are stored centrally and queried at runtime.

Instead of this, repeated for every feature and plan:

```javascript
if (planId == Plans.Enterprise) {
  enable_feature_x();
} else if (planId == Plans.Pro) {
  // ...
}
```

Your code becomes a single, clean call:

```javascript
const { enabled } = useEntitlement(“reports”);
if (enabled) {
  showReportButton();
}
```

This simple pattern replaces hundreds of lines of brittle logic. It also allows business users to change packaging without ever touching code.

### **Pillar 3: Real-Time Metering**

AI products have probabilistic consumption, introducing uncertainty. Real-time metering gives customers transparency and predictability.

This is critical because, as [Marcos Rivera](https://www.linkedin.com/in/marcoslrivera/) of Pricing I/O says, a core anxiety of consumption billing is the unknown:

> The ‘oh shit’ moment everyone’s worried about is the huge, unpredictable bill. It’s nerve-wracking to go into an agreement and not know how much you’re going to use. Real CFOs don’t buy that way.

Your architecture must solve this anxiety. This is why you must provide tools to estimate and monitor usage. Visibility calms anxiety.

### **Pillar 4: A Control Plane for GTM Teams**

Let non-engineers manage monetization. Your growth and product teams should be able to:

*   Create new plans and SKUs
    
*   Adjust limits or pricing tiers
    
*   Trigger experiments or promotions
    

...all without filing an engineering ticket.

[

![](https://substackcdn.com/image/fetch/$s_!cBK4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F592c3dd8-6792-488d-8bee-6241059b62cb_2071x1268.png)



](https://substackcdn.com/image/fetch/$s_!cBK4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F592c3dd8-6792-488d-8bee-6241059b62cb_2071x1268.png)

### Before and After

[

![](https://substackcdn.com/image/fetch/$s_!TYeh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F62fbe096-cc13-4dc8-808d-05c0f8791b13_1300x652.png)



](https://substackcdn.com/image/fetch/$s_!TYeh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F62fbe096-cc13-4dc8-808d-05c0f8791b13_1300x652.png)

These pillars dramatically increase agility. We built [Schematic](https://schematichq.com/?utm_source=gauravnewsletter&utm_medium=newsletter&utm_campaign=book202602&utm_content=schematic) to make this possible.

Zep launched metered billing in ten minutes. Plotly shipped two AI products two quarters faster.

How fast could you run?

## Treat Pricing Like Product

When most founders think about pricing, few of them picture architecture.

But your architecture determines how fast you can test and how confidently you can scale.

[Kurt Smith](https://www.linkedin.com/in/kurtbsmith/), the CEO of Fexa, once said something that to this day I find both true and haunting:

> Think about all the creative pricing & packaging conversations in SaaS & AI companies that simply stopped happening, because people accepted that even if they had good ideas, their systems would make testing those ideas impossible.

In the AI era, those who treat pricing like product will win.

* * *

_Thank you for reading. As a reminder, to get your copy of **You’re Leaving Money on the Table**, [click here](https://schematichq.com/book?utm_source=gauravnewsletter&utm_medium=newsletter&utm_campaign=book2026&utm_content=schematic) (online) or [click here](https://www.amazon.com/dp/B0G545Y16J) (print)._
