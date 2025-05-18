## 24. Mobile Application Specifications

### 24.1 Native Applications

#### 24.1.1 iOS Application

- **Platform Requirements:**
  - iOS 14.0 and later support
  - iPhone and iPad universal application
  - Native Swift implementation
  - SwiftUI for modern interface components

- **iOS-Specific Features:**
  - Face ID / Touch ID authentication
  - Apple Watch companion app for daily insights
  - iCloud sync for cross-device experience
  - Spotlight search integration for results
  - Handoff support for continuous experience
  - ShareSheet integration for sharing results
  - Siri Shortcuts for quick assessment access
  - Widgets for dashboard and daily insights

- **iOS Development Standards:**
  - MVVM architecture pattern
  - Swift Package Manager for dependencies
  - Swift UI design system with reusable components
  - Comprehensive unit testing with XCTest
  - UI automation with XCUITest
  - Continuous integration with Xcode Cloud
  - TestFlight distribution for beta testing

#### 24.1.2 Android Application

- **Platform Requirements:**
  - Android 8.0 (API level 26) and later
  - Tablet and phone adaptive layouts
  - Kotlin implementation
  - Jetpack Compose for modern UI
  - Material Design 3 (Material You) compliance

- **Android-Specific Features:**
  - Biometric authentication
  - Adaptive icon implementation
  - App shortcuts for quick actions
  - Google Assistant integration
  - Android widgets for home screen
  - Dark/light theme based on system settings
  - Offline first architecture with Room database
  - App bundles for optimized distribution
  - Google Play instant support for quick demos

- **Android Development Standards:**
  - MVVM with Clean Architecture
  - Dependency injection with Hilt
  - Kotlin Coroutines for asynchronous operations
  - Jetpack libraries implementation
  - JUnit and Espresso for testing
  - Gradle modularization for faster builds
  - Continuous integration with GitHub Actions

### 24.2 Mobile-Specific Features

#### 24.2.1 Native Capabilities Integration

- **Device Sensors:**
  - Haptic feedback for interactions
  - Camera integration for profile photos
  - Motion sensitivity for animations (with accessibility toggle)
  - Location awareness for regional content (opt-in)

- **Device Integration:**
  - Calendar integration for reminders
  - Contact integration for sharing
  - Photo library for saving visualizations
  - Health app integration for mood tracking (iOS)
  - Google Fit integration (Android)

- **Offline Capabilities:**
  - Complete assessment offline
  - View previous results offline
  - Background sync when connection restored
  - Offline content caching
  - Custom offline mode UI indicators

#### 24.2.2 Mobile User Experience

- **Mobile Navigation Patterns:**
  - Bottom navigation for primary sections
  - Swipe gestures for assessment phases
  - Pull-to-refresh for content updates
  - Bottom sheets for supplementary information
  - Floating action buttons for primary actions
  - Gesture-based interactions for tower rotation
  - Card-based UI for scrollable content

- **Input Optimization:**
  - Single-hand operation support
  - Touch target sizing (minimum 48dp)
  - Form input optimized for mobile keyboards
  - Auto-advance after selection in assessment
  - Simplified multi-step processes
  - Speech-to-text integration for feedback
  - Smart defaults to reduce typing

- **Visual Adaptations:**
  - Different visualization modes for small screens
  - Portrait and landscape optimized layouts
  - Reduced animation option for performance
  - Simplified data visualization for mobile
  - High contrast mode for outdoor visibility
  - Screen size-based content prioritization

### 24.3 Push Notification Strategy

#### 24.3.1 Notification Categories

- **Engagement Notifications:**
  - Daily insight notifications
  - Weekly reflection prompts
  - Special event notifications
  - New content availability alerts
  - Achievement unlocked notifications

- **Functional Notifications:**
  - Assessment completion reminders
  - Results ready notifications
  - Account update confirmations
  - Subscription renewal reminders
  - WhatsApp report delivery notifications

- **Personalized Notifications:**
  - Type-specific growth opportunities
  - Custom milestone celebrations
  - Personalized challenges based on type
  - Compatibility insights with connections
  - Tailored content recommendations

#### 24.3.2 Notification Management

- **User Control:**
  - Granular notification category settings
  - Frequency controls (daily, weekly, monthly)
  - Quiet hours configuration
  - Channel management (by importance)
  - Easy global opt-out option

- **Delivery Optimization:**
  - Time zone awareness for delivery
  - Engagement-based optimal timing
  - Notification bundling to reduce interruptions
  - Progressive notification strategy
  - Re-engagement campaigns for dormant users

- **Technical Implementation:**
  - Firebase Cloud Messaging integration
  - Apple Push Notification service integration
  - Rich notification support with media
  - Notification analytics tracking
  - A/B testing capabilities for notification content
  - Fallback to in-app notifications

### 24.4 App Store Optimization

#### 24.4.1 Store Presence

- **App Store Listings:**
  - Compelling app title and subtitle
  - Keyword-optimized descriptions
  - Localized listings for key markets
  - Benefit-focused feature list
  - Persuasive promotional text
  - Category selection and secondary category

- **Visual Assets:**
  - High-quality app icon design
  - App preview videos (max 30 seconds)
  - Screenshot design for key features
  - Device-specific screenshots
  - Staged rollout for A/B testing visuals

- **Reviews and Ratings:**
  - In-app review prompting strategy
  - Review response protocols
  - Rating improvement campaign
  - Negative feedback interception flow
  - Featured review highlighting

#### 24.4.2 Performance Metrics

- **App Analytics:**
  - Install attribution tracking
  - User acquisition cost monitoring
  - Retention rate optimization
  - Session length and frequency analytics
  - Feature usage tracking
  - Conversion rate optimization
  - Crash and ANR (Application Not Responding) monitoring

- **Store Optimization KPIs:**
  - App Store search visibility
  - Keyword ranking tracking
  - Conversion rate (page views to installs)
  - Browse vs. search acquisition ratio
  - Category ranking monitoring
  - Competitor comparison benchmarks

### 24.5 Cross-Platform Consistency

#### 24.5.1 Data Synchronization

- **User Account Sync:**
  - Cross-device profile synchronization
  - Assessment history across platforms
  - Preference and settings synchronization
  - Seamless authentication state transfer
  - Conflict resolution for simultaneous edits

- **Content Consistency:**
  - Shared content repository across platforms
  - Synchronized content updates
  - Platform-appropriate formatting
  - Consistent terminology and branding
  - Shared media assets with device-appropriate resolutions

#### 24.5.2 Experience Continuity

- **Cross-Platform Journey:**
  - Start assessment on one device, continue on another
  - Consistent notification history across devices
  - Unified achievement and progress tracking
  - Shared bookmarks and saved content
  - Recent activity history synchronization

- **Platform-Specific Optimizations:**
  - Device-appropriate interaction patterns
  - Platform design language adherence
  - Performance optimization for device capabilities
  - Feature parity with platform-appropriate implementations
  - Consistent core functionality with platform-specific enhancements

### 24.6 Mobile Development Workflow

#### 24.6.1 Development Approach

- **Code Sharing Strategy:**
  - Shared business logic in cross-platform layer
  - Platform-specific UI implementations
  - Reusable API service layer
  - Shared data models and validation
  - Cross-platform testing utilities

- **Development Tools:**
  - Mobile-specific CI/CD pipeline
  - Automated UI testing for both platforms
  - Device farm integration for testing
  - Feature flagging for gradual rollout
  - Crash reporting and analytics integration

#### 24.6.2 Release Management

- **Versioning Strategy:**
  - Synchronized version numbering across platforms
  - Phased rollout approach
  - Beta program for early feedback
  - Staged production deployment
  - Hotfix protocol for critical issues

- **App Store Management:**
  - App review guidelines compliance checklist
  - App Store submission automation
  - Release notes templating
  - Release schedule coordination
  - Promotional update planning## 14. Security and Compliance Framework

### 14.1 Security Architecture

#### 14.1.1 Authentication Security

- **Password Management:**
  - Bcrypt hashing with minimum work factor of 12
  - Password complexity requirements enforcement
  - Password rotation policies
  - Secure password recovery procedures

- **Multi-factor Authentication:**
  - TOTP (Time-based One-Time Password) implementation
  - SMS/WhatsApp verification code options
  - Backup recovery codes system
  - MFA enrollment and management

- **Session Management:**
  - Secure cookie configurations (Secure, HttpOnly, SameSite)
  - CSRF token implementation
  - Session timeout controls (15 minutes for admin, 30 days for users)
  - Device fingerprinting for suspicious login detection

#### 14.1.2 Authorization Controls

- **Role-Based Access Control (RBAC):**
  - Defined roles (User, Premium User, Admin, Super Admin)
  - Fine-grained permission structure
  - Context-based access controls
  - Principle of least privilege enforcement

- **API Security:**
  - JWT-based authentication
  - Scope-limited access tokens
  - Rate limiting and throttling
  - API key management for admin functions

- **Third-Party Access:**
  - OAuth 2.0 implementation
  - Scope-limited permissions
  - Regular token rotation
  - Transparent user consent flows

#### 14.1.3 Data Protection

- **Encryption Standards:**
  - AES-256 for data at rest
  - TLS 1.3 for data in transit
  - Field-level encryption for sensitive data
  - Key management procedures

- **Data Lifecycle Management:**
  - Data classification framework
  - Retention period specifications
  - Secure data deletion procedures
  - Anonymization techniques for analytics

### 14.2 Compliance Requirements

#### 14.2.1 GDPR Compliance

- **Lawful Basis Requirements:**
  - Clearly defined lawful bases for all data processing
  - Separate consent mechanisms for different data uses
  - Documented legitimate interests assessments
  - Purpose limitation enforcement

- **Data Subject Rights:**
  - Access request handling procedures
  - Rectification processes
  - Right to erasure implementation
  - Right to portability support
  - Right to object handling

- **Documentation Requirements:**
  - Record of processing activities
  - Data protection impact assessments
  - Processor agreements
  - Cross-border transfer mechanisms

#### 14.2.2 CCPA/CPRA Compliance

- **Notice Requirements:**
  - Categories of personal information collected
  - Business purpose disclosures
  - Third-party sharing information
  - "Do Not Sell My Personal Information" functionality

- **Consumer Rights Support:**
  - Right to know request handling
  - Right to delete procedures
  - Right to opt-out mechanisms
  - Non-discrimination policy implementation

#### 14.2.3 HIPAA Considerations

- **PHI Protection Measures:**
  - Business Associate Agreements for relevant vendors
  - Technical safeguards for health data
  - Administrative safeguards documentation
  - Physical security requirements

- **Breach Notification Procedures:**
  - Incident response plan
  - Notification timelines and requirements
  - Documentation protocols
  - Remediation procedures

#### 14.2.4 Global Compliance Measures

- **Cross-Border Data Transfers:**
  - Standard Contractual Clauses implementation
  - Privacy Shield alternatives
  - Regional data residency options
  - Transfer impact assessments

- **Localized Compliance Requirements:**
  - Country-specific privacy provisions
  - Local language requirements for notices
  - Territory-specific cookie consent mechanisms
  - Regional marketing restrictions

### 14.3 Security Testing and Monitoring

#### 14.3.1 Penetration Testing

- **Testing Schedule:**
  - Annual comprehensive penetration tests
  - Quarterly vulnerability assessments
  - Pre-launch security reviews for major features
  - Continuous automated scanning

- **Testing Coverage:**
  - Network security testing
  - Application security testing
  - Social engineering resistance
  - Physical security considerations

#### 14.3.2 Security Monitoring

- **Security Information and Event Management (SIEM):**
  - Real-time event correlation
  - Suspicious activity detection
  - Logging requirements (scope, retention, format)
  - Alert mechanisms and escalation procedures

- **Continuous Monitoring:**
  - Endpoint monitoring
  - Network traffic analysis
  - User behavior analytics
  - API abuse detection

#### 14.3.3 Incident Response

- **Response Plan:**
  - Defined incident classification
  - Response team roles and responsibilities
  - Communication templates and procedures
  - Containment, eradication, and recovery protocols

- **Post-Incident Procedures:**
  - Root cause analysis methodology
  - Documentation requirements
  - Improvement implementation process
  - Stakeholder notification procedures

## 15. Technical Infrastructure Requirements

### 15.1 Server Architecture

#### 15.1.1 Application Servers

- **Web Application Layer:**
  - Node.js server (minimum version 16.x)
  - Horizontal scaling configuration
  - Load balancing requirements
  - Stateless design for scalability

- **API Layer:**
  - RESTful API implementation
  - GraphQL support for complex data queries
  - Microservices architecture for key components
  - API gateway for unified access

- **Background Processing:**
  - Job queue implementation (Redis-based)
  - Worker processes for report generation
  - Scheduled task management
  - Async processing for CPU-intensive operations

#### 15.1.2 Database Infrastructure

- **Primary Database:**
  - MongoDB (minimum version 5.0)
  - Sharding configuration for horizontal scaling
  - Replica sets for high availability
  - Read replicas for performance optimization

- **Caching Layer:**
  - Redis implementation (minimum version 6.x)
  - Distributed caching architecture
  - Cache invalidation strategies
  - Persistent vs. volatile cache configuration

- **Search Functionality:**
  - Elasticsearch implementation
  - Full-text search capabilities
  - Faceted search for admin dashboard
  - Search analytics and tracking

#### 15.1.3 Hosting Requirements

- **Cloud Provider Specifications:**
  - AWS primary deployment
  - Multi-region configuration for global availability
  - Auto-scaling group configuration
  - Reserved instances for cost optimization

- **Container Orchestration:**
  - Kubernetes deployment
  - Helm charts for application components
  - Resource allocation specifications
  - Service mesh implementation

- **DevOps Infrastructure:**
  - CI/CD pipeline requirements
  - Infrastructure as Code implementation (Terraform)
  - Blue/Green deployment capability
  - Rollback procedures

### 15.2 Database Schema

#### 15.2.1 Core Data Models

- **User Schema:**
  ```
  {
    _id: ObjectId,
    fullName: String,
    email: String,
    phoneNumber: String,
    countryCode: String,
    passwordHash: String,
    accountStatus: String,
    verificationStatus: {
      email: Boolean,
      phone: Boolean
    },
    roles: [String],
    createdAt: Date,
    updatedAt: Date,
    lastLogin: Date,
    preferences: {
      language: String,
      notifications: Object,
      whatsappConsent: Boolean
    }
  }
  ```

- **Assessment Results Schema:**
  ```
  {
    _id: ObjectId,
    userId: ObjectId,
    assessmentDate: Date,
    version: String,
    completed: Boolean,
    foundationSelections: [Number],
    blockSelections: [Number],
    stateDistribution: {
      healthy: Number,
      average: Number,
      unhealthy: Number
    },
    subtypeDistribution: {
      self: Number,
      oneToOne: Number,
      social: Number
    },
    results: {
      primaryType: String,
      typeName: String,
      influence: String,
      influenceNumber: Number,
      goodMoodDescription: String,
      badMoodDescription: String,
      dominantSubtype: String
    },
    metadata: {
      duration: Number,
      platform: String,
      browser: String
    }
  }
  ```

- **Content Schema:**
  ```
  {
    _id: ObjectId,
    contentType: String,
    typeNumber: Number,
    language: String,
    sections: {
      overview: String,
      influenceDescriptions: Object,
      moodStateDescriptions: Object,
      subtypeDescriptions: Object
    },
    version: Number,
    active: Boolean,
    createdAt: Date,
    updatedAt: Date,
    createdBy: ObjectId
  }
  ```

#### 15.2.2 Relationship Mapping

- **User Relationships:**
  - One-to-many with Assessment Results
  - One-to-many with Subscription records
  - One-to-many with Support Tickets
  - Many-to-many with Teams (for enterprise)

- **Content Relationships:**
  - One-to-many with Localized Versions
  - Many-to-many with Assessment Results
  - One-to-many with Content Revisions

- **Analytics Relationships:**
  - Many-to-one with Users
  - Many-to-one with Assessment Results
  - Many-to-many with Content Views

#### 15.2.3 Indexing Strategy

- **Performance Indexes:**
  - User email (unique index)
  - User phone number (unique index)
  - Assessment result by user and date (compound index)
  - Content by type and language (compound index)

- **Search Indexes:**
  - Full-text index on user name and email
  - Full-text index on content sections
  - Geo-spatial index for location-based analytics

- **Analytics Indexes:**
  - Date-based indexes for time-series queries
  - Compound indexes for frequently filtered reports
  - Sparse indexes for premium user queries

### 15.3 Caching Strategy

#### 15.3.1 Application Cache

- **Cache Layers:**
  - Memory cache (Node.js instance)
  - Distributed cache (Redis)
  - Browser cache (for static assets)
  - CDN cache (for global assets)

- **Cache Policies:**
  - Content: 24-hour TTL with invalidation on update
  - User Profile: 1-hour TTL with invalidation on update
  - Session Data: 30-minute TTL with sliding expiration
  - Public Data: 1-hour TTL with background refresh

- **Cache Invalidation:**
  - Version-based invalidation for content
  - Explicit invalidation on update
  - Channel-based pub/sub for distributed invalidation
  - Graceful degradation on cache miss

#### 15.3.2 Database Caching

- **Query Cache:**
  - Frequently accessed queries cached in Redis
  - Materialized views for complex analytics
  - Read replicas for reporting queries
  - Query result caching with parameterized invalidation

- **Write-Through Caching:**
  - Cache update on database write
  - Atomic update operations
  - Batch processing for high-volume operations
  - Optimistic concurrency control

### 15.4 Content Delivery Network

#### 15.4.1 CDN Configuration

- **Provider Requirements:**
  - CloudFront primary implementation
  - Multi-region edge location coverage
  - Custom domain support
  - HTTPS enforcement

- **Asset Configuration:**
  - Static asset hosting (JS, CSS, images)
  - Cache control headers implementation
  - Versioned URLs for cache busting
  - Compression settings (Brotli, Gzip)

- **Security Settings:**
  - WAF integration for edge security
  - Geo-restriction capabilities
  - Custom error pages
  - Origin request policies

#### 15.4.2 Global Delivery Optimization

- **Performance Enhancements:**
  - HTTP/3 and QUIC support
  - Edge computing for regional customization
  - Image optimization service
  - Video streaming optimization

- **Regional Optimizations:**
  - Local caching strategies for high-traffic regions
  - Content adaptation based on region
  - Language-specific edge routing
  - Regional A/B testing capability

### 15.5 Backup and Disaster Recovery

#### 15.5.1 Backup Strategy

- **Backup Types and Schedule:**
  - Full daily snapshots (retained for 30 days)
  - Incremental hourly backups (retained for 7 days)
  - Transaction log backups (5-minute intervals)
  - Off-site backup replication

- **Backup Security:**
  - Encrypted backup storage
  - Access controls for backup restoration
  - Periodic backup restoration testing
  - Secure off-site storage

#### 15.5.2 Disaster Recovery

- **Recovery Plans:**
  - RTO (Recovery Time Objective): 4 hours
  - RPO (Recovery Point Objective): 15 minutes
  - Formal disaster recovery procedures
  - Regular DR drills (quarterly)

- **High Availability Configuration:**
  - Multi-region active-passive deployment
  - Automated failover mechanisms
  - Data replication across regions
  - Global DNS failover configuration

## 16. Performance Specifications

### 16.1 Performance Requirements

#### 16.1.1 Response Time Targets

- **Web Application:**
  - Page load time: < 2 seconds (initial load)
  - Time to interactive: < 1.5 seconds
  - First contentful paint: < 1 second
  - Route transitions: < 300ms

- **API Performance:**
  - Simple requests: < 200ms
  - Complex queries: < 500ms
  - Authentication: < 300ms
  - Report generation: < 3 seconds

- **Mobile Optimization:**
  - Initial load on 3G: < 5 seconds
  - Data usage for complete assessment: < 2MB
  - Assessment submission: < 500ms
  - Result retrieval: < 1 second

#### 16.1.2 Throughput Requirements

- **Concurrent Users:**
  - Support for 10,000 concurrent active users
  - 1,000 concurrent assessment submissions
  - 500 concurrent report generations
  - 200 concurrent admin panel users

- **Transaction Volume:**
  - 100,000 daily assessment completions
  - 50,000 daily report generations
  - 5,000 daily user registrations
  - 1,000 daily WhatsApp report deliveries

#### 16.1.3 Resource Utilization

- **Front-end Efficiency:**
  - JavaScript bundle size: < 300KB minified and gzipped
  - CSS budget: < 100KB minified and gzipped
  - Memory usage: < 100MB on typical devices
  - CPU utilization: Peak < 30% on mid-range devices

- **Back-end Efficiency:**
  - Average CPU utilization: < 60%
  - Memory usage per instance: < 2GB
  - Database connections: Optimized connection pooling
  - Disk I/O: Minimized with proper indexing

### 16.2 Scalability Architecture

#### 16.2.1 Horizontal Scaling

- **Application Tier:**
  - Auto-scaling group configuration
  - Scale-out triggers (CPU > 70% for 5 minutes)
  - Scale-in triggers (CPU < 30% for 30 minutes)
  - Minimum 3 instances for high availability

- **Database Tier:**
  - Read replica scaling for high-read scenarios
  - Sharding strategy for data growth
  - Capacity planning for 50% YoY growth
  - Multi-region data distribution

#### 16.2.2 Vertical Scaling

- **Instance Sizing:**
  - Application servers: 4 vCPU, 8GB RAM
  - Database primary: 8 vCPU, 32GB RAM
  - Redis cache: 4 vCPU, 16GB RAM
  - Background workers: 4 vCPU, 8GB RAM

- **Upgrade Paths:**
  - Defined performance thresholds for upgrades
  - Seamless vertical scaling procedures
  - Zero-downtime upgrade processes
  - Performance testing after scaling events

### 16.3 Load Testing

#### 16.3.1 Testing Scenarios

- **Baseline Performance:**
  - Average load testing (2,000 concurrent users)
  - Typical user journey simulation
  - Geographic distribution simulation
  - Device diversity simulation

- **Peak Load Testing:**
  - 5x normal load simulation (10,000 concurrent users)
  - Marketing campaign traffic simulation
  - Viral sharing scenario testing
  - Holiday season peak traffic

- **Stress Testing:**
  - Breaking point determination
  - Graceful degradation verification
  - Recovery testing after overload
  - Component isolation testing

#### 16.3.2 Testing Tools and Methods

- **Load Testing Tools:**
  - JMeter for API and backend testing
  - Lighthouse for front-end performance
  - Real User Monitoring (RUM) for production metrics
  - Custom scripts for user journey simulation

- **Testing Frequency:**
  - Pre-release performance testing
  - Monthly baseline testing
  - Quarterly stress testing
  - Ad-hoc testing after significant changes

### 16.4 Performance Monitoring

#### 16.4.1 Real-time Monitoring

- **Application Performance Monitoring:**
  - New Relic implementation
  - Custom transaction tracing
  - Error rate tracking
  - Apdex score targets

- **Infrastructure Monitoring:**
  - CPU, memory, disk, network utilization
  - Queue length monitoring
  - Database query performance
  - Cache hit ratio tracking

#### 16.4.2 Performance Dashboards

- **Executive Dashboard:**
  - Overall system health
  - Key performance indicators
  - SLA compliance metrics
  - Trend analysis

- **Technical Dashboards:**
  - Detailed performance metrics
  - Anomaly detection
  - Resource utilization visualization
  - Alerting configuration

## 17. Comprehensive Analytics Implementation

### 17.1 Event Tracking Framework

#### 17.1.1 Core Events

- **User Lifecycle Events:**
  - Registration initiated/completed
  - Profile update
  - Password change/reset
  - Account deletion request
  - Subscription changes

- **Assessment Events:**
  - Assessment started
  - Each phase completion
  - Assessment abandonment
  - Results viewed
  - Report downloaded

- **Engagement Events:**
  - Feature usage
  - Page views and time on page
  - Scroll depth
  - Interactive element engagement
  - Return visit patterns

#### 17.1.2 Custom Event Properties

- **User Properties:**
  - Anonymous user ID (pre-registration)
  - Registration source
  - Device information
  - Geographic location
  - Language preference

- **Session Properties:**
  - Session duration
  - Session depth
  - Interaction frequency
  - Inactivity periods
  - Conversion points

- **Event Context:**
  - Timestamp
  - Previous action
  - Referral source
  - Feature version
  - A/B test variant

### 17.2 Analytics Implementation

#### 17.2.1 Data Collection

- **Client-side Tracking:**
  - Google Analytics 4 implementation
  - Custom event tracking library
  - Performance timing capture
  - Error and exception tracking

- **Server-side Tracking:**
  - API usage metrics
  - Authentication events
  - Database performance metrics
  - Background job monitoring

- **Data Warehouse:**
  - BigQuery integration
  - Daily ETL processes
  - Data transformation pipelines
  - Historical data archiving

#### 17.2.2 Analysis Tools

- **Business Intelligence:**
  - Looker dashboards for business metrics
  - Data Studio reports for marketing
  - Custom SQL queries for deep analysis
  - Scheduled report distribution

- **Product Analytics:**
  - Mixpanel integration for user flows
  - Heatmap tracking with Hotjar
  - Session recording samples
  - Funnel visualization

### 17.3 User Journey Mapping

#### 17.3.1 Journey Definition

- **Primary Journeys:**
  - New user onboarding
  - Assessment completion
  - Result sharing
  - Subscription conversion
  - Return user engagement

- **Journey Mapping Components:**
  - Touchpoint identification
  - Conversion step tracking
  - Drop-off point analysis
  - Re-engagement opportunities

#### 17.3.2 Journey Analytics

- **Path Analysis:**
  - Common path identification
  - Deviation pattern recognition
  - Success path comparison
  - Abandonment prediction

- **Cohort Analysis:**
  - Retention by acquisition source
  - Behavioral cohort comparison
  - Feature adoption by cohort
  - Conversion rate by segment

### 17.4 Conversion Optimization

#### 17.4.1 Funnel Analysis

- **Primary Conversion Funnels:**
  - Registration completion funnel
  - Assessment completion funnel
  - Free-to-premium conversion funnel
  - Sharing activation funnel

- **Micro-Conversion Tracking:**
  - Email capture success rate
  - WhatsApp opt-in rate
  - Profile completion percentage
  - Content engagement depth

#### 17.4.2 A/B Testing Framework

- **Testing Infrastructure:**
  - Google Optimize integration
  - Server-side testing capability
  - Multivariate testing support
  - Statistical significance calculator

- **Testing Strategy:**
  - Key page variant testing
  - Copy and messaging tests
  - UI component variations
  - Pricing presentation tests

### 17.5 Retention Analysis

#### 17.5.1 Retention Metrics

- **Engagement Definitions:**
  - Daily active users (DAU)
  - Weekly active users (WAU)
  - Monthly active users (MAU)
  - Stickiness ratio (DAU/MAU)

- **Retention Tracking:**
  - Classic retention cohorts (D1, D7, D30)
  - Feature-specific retention
  - Notification response rates
  - Reactivation success rates

#### 17.5.2 Churn Analysis

- **Churn Definitions:**
  - Account deletion rate
  - Subscription cancellation rate
  - Usage decline patterns
  - Engagement drop-off

- **Churn Prediction:**
  - Early warning indicators
  - At-risk user identification
  - Intervention opportunity timing
  - Winback campaign triggers

## 18. Payment Processing

### 18.1 Payment Gateway Integration

#### 18.1.1 Primary Payment Provider

- **Stripe Integration:**
  - Complete Stripe API implementation
  - Stripe Elements for secure forms
  - Strong Customer Authentication (SCA) support
  - Localized payment method support

- **Payment Methods:**
  - Credit/debit cards (Visa, Mastercard, Amex)
  - Digital wallets (Apple Pay, Google Pay)
  - Local payment methods by region
  - Bank transfers where appropriate

- **Security Measures:**
  - PCI DSS compliance
  - Tokenization of payment information
  - Fraud detection tools
  - Transaction monitoring

#### 18.1.2 Alternative Payment Methods

- **PayPal Integration:**
  - Express checkout flow
  - Subscription handling
  - Instant payment notification (IPN)
  - Refund processing

- **Regional Payment Methods:**
  - Alipay for Chinese market
  - Boleto for Brazilian market
  - SEPA for European market
  - UPI for Indian market

### 18.2 Subscription Management

#### 18.2.1 Subscription Lifecycle

- **Subscription Creation:**
  - Initial plan selection
  - Trial period management
  - Proration for plan changes
  - Coupon and discount application

- **Recurring Billing:**
  - Automatic renewal processing
  - Failed payment handling
  - Dunning management
  - Grace period configuration

- **Cancellation Handling:**
  - Self-service cancellation flow
  - Cancellation survey
  - Win-back offers
  - Access termination process

#### 18.2.2 Subscription Plans

- **Plan Structure:**
  - Monthly subscription option
  - Annual subscription option (with discount)
  - Team/enterprise plans
  - Limited-time promotional plans

- **Feature Access Control:**
  - Entitlement management
  - Feature flags by subscription
  - Usage limits and quotas
  - Premium content access

### 18.3 Invoice Management

#### 18.3.1 Invoice Generation

- **Invoice Creation:**
  - Automated invoice generation
  - Custom invoice numbering
  - Tax calculation by jurisdiction
  - Line item customization

- **Invoice Delivery:**
  - Email delivery of invoices
  - PDF invoice formatting
  - Invoice history in user dashboard
  - Download and print options

#### 18.3.2 Financial Reporting

- **Revenue Reports:**
  - Monthly recurring revenue (MRR) tracking
  - Annual recurring revenue (ARR) tracking
  - Revenue by plan type
  - Revenue by region

- **Transaction Reports:**
  - Daily transaction reconciliation
  - Refund and chargeback tracking
  - Payment method distribution
  - Currency conversion tracking

### 18.4 Refund Processing

#### 18.4.1 Refund Policies

- **Refund Types:**
  - Full refund process
  - Partial refund process
  - Subscription credits
  - Plan downgrade as alternative

- **Policy Implementation:**
  - 30-day satisfaction guarantee
  - Prorated refunds for unused time
  - Special case handling
  - Approval workflow for exceptions

#### 18.4.2 Refund Execution

- **Refund Procedures:**
  - Customer-initiated refund requests
  - Admin-initiated refund process
  - Refund reason tracking
  - Communication templates

- **Financial Reconciliation:**
  - Refund impact on revenue reporting
  - Chargeback prevention measures
  - Refund trend analysis
  - Reason code tracking

### 18.5 Tax Handling

#### 18.5.1 Tax Calculation

- **Global Tax Support:**
  - US sales tax calculation
  - EU VAT handling
  - GST/HST for Canada
  - Australian GST

- **Tax Determination:**
  - Location-based tax rules
  - Digital goods classification
  - B2B vs. B2C differentiation
  - Tax exemption handling

#### 18.5.2 Tax Reporting

- **Compliance Documentation:**
  - Tax reporting by jurisdiction
  - VAT MOSS reporting for EU
  - Quarterly and annual tax summaries
  - Data exports for tax filing

- **Customer Documentation:**
  - Tax ID collection where required
  - Tax exemption certificate management
  - Digital delivery confirmation
  - Proof of customer location

## 19. Accessibility Requirements

### 19.1 WCAG 2.1 AA Compliance

#### 19.1.1 Perceivable Requirements

- **Text Alternatives:**
  - Alt text for all images
  - Transcripts for audio content
  - Descriptions for complex visualizations
  - Text alternatives for graphical buttons

- **Time-based Media:**
  - Captions for video content
  - Audio descriptions where needed
  - Controls for time-based animations
  - Alternative static representations

- **Adaptable Content:**
  - Responsive layouts for all screens
  - Content readable in portrait and landscape
  - Logical reading order in document flow
  - No reliance on visual-only cues

- **Distinguishable Content:**
  - Minimum contrast ratio of 4.5:1 for text
  - Non-text contrast ratio of 3:1
  - No content distinction by color alone
  - Text resizable up to 200% without loss of function

#### 19.1.2 Operable Requirements

- **Keyboard Accessibility:**
  - All functionality available via keyboard
  - No keyboard traps
  - Logical tab order
  - Visible focus indicators

- **Timing Adjustments:**
  - No time limits on interactions
  - Pause, stop, hide controls for moving content
  - Session timeout warnings with extension option
  - Data saving before timeout

- **Navigation Mechanisms:**
  - Skip navigation links
  - Descriptive page titles
  - Focus order matches visual order
  - Link purpose clear from context
  - Multiple ways to locate content

- **Input Modalities:**
  - Target size minimum of 44x44 pixels
  - Touch-friendly interface elements
  - Support for pointer gestures
  - Support for motion reduction

#### 19.1.3 Understandable Requirements

- **Readable Content:**
  - Language identification in markup
  - Clear identification of language changes
  - Unusual word explanation
  - Abbreviation expansion on first use

- **Predictable Operation:**
  - Consistent navigation patterns
  - Consistent identification of components
  - No context changes on input alone
  - Change notifications for setting changes

- **Input Assistance:**
  - Automatic error detection
  - Clear error messages and suggestions
  - Error prevention for important submissions
  - Context-sensitive help availability

#### 19.1.4 Robust Requirements

- **Compatible Implementation:**
  - Valid HTML markup
  - Complete start and end tags
  - Unique IDs
  - Correct parent-child relationships

- **Name, Role, Value:**
  - Proper ARIA implementation
  - Custom component accessibility
  - Status messages identifiable
  - Compatibility with assistive technologies

### 19.2 Screen Reader Compatibility

#### 19.2.1 Screen Reader Testing

- **Supported Screen Readers:**
  - JAWS (Windows)
  - NVDA (Windows)
  - VoiceOver (macOS/iOS)
  - TalkBack (Android)

- **Critical Path Testing:**
  - Registration and login flows
  - Assessment completion
  - Results viewing
  - Account management

#### 19.2.2 ARIA Implementation

- **Landmark Regions:**
  - Properly marked main content
  - Navigation landmarks
  - Search functionality
  - Complementary content

- **Dynamic Content:**
  - Live regions for updates
  - Modal dialog management
  - Progress indicator announcements
  - Notification handling

### 19.3 Keyboard Navigation

#### 19.3.1 Focus Management

- **Focus Indicators:**
  - High-visibility focus styles
  - Consistent focus behavior
  - Skip link functionality
  - Focus trapping in modals

- **Keyboard Shortcuts:**
  - Navigation shortcuts
  - Action shortcuts
  - Shortcut documentation
  - Shortcut customization option

#### 19.3.2 Interactive Elements

- **Custom Controls:**
  - Accessible button implementation
  - Custom dropdown accessibility
  - Slider component accessibility
  - Drag-and-drop alternatives

- **Form Accessibility:**
  - Proper label association
  - Grouped controls
  - Error identification
  - Autocomplete attributes

### 19.4 Accessibility Testing

#### 19.4.1 Testing Methods

- **Automated Testing:**
  - Axe-core integration in CI/CD pipeline
  - WAVE tool evaluation
  - Lighthouse accessibility audits
  - Color contrast analyzers

- **Manual Testing:**
  - Keyboard-only testing protocol
  - Screen reader testing checklist
  - Cognitive walkthrough procedure
  - Low-vision simulation testing

#### 19.4.2 User Testing

- **Accessibility Testing Groups:**
  - Testing with screen reader users
  - Testing with keyboard-only users
  - Testing with users with cognitive disabilities
  - Testing with low-vision users

- **Feedback Integration:**
  - Accessibility issue reporting
  - Prioritization framework
  - Remediation planning
  - Regression testing

## 20. Gamification Elements

### 20.1 Achievement System

#### 20.1.1 Achievement Framework

- **Achievement Categories:**
  - Onboarding achievements
  - Assessment completion achievements
  - Exploration achievements
  - Social sharing achievements
  - Personal growth achievements

- **Achievement Levels:**
  - Bronze tier (easy to obtain)
  - Silver tier (moderate effort)
  - Gold tier (significant accomplishment)
  - Platinum tier (exceptional dedication)

#### 20.1.2 Badge Design

- **Visual Design:**
  - Consistent badge illustration style
  - Color coding by category
  - Level indication
  - Unlocked vs. locked states

- **Badge Rewards:**
  - Display on user profile
  - Special feature unlocks
  - Personalized insights
  - Exclusive content access

### 20.2 Progress Tracking

#### 20.2.1 Progress Visualization

- **Progress Indicators:**
  - Assessment completion percentage
  - Profile completeness meter
  - Exploration progress map
  - Achievement collection display

- **Milestone Tracking:**
  - Key milestone celebrations
  - Progress history visualization
  - Comparative timeline view
  - Goal proximity indicators

#### 20.2.2 Streaks and Consistency

- **Streak Mechanics:**
  - Daily check-in streaks
  - Weekly assessment streaks
  - Monthly reflection streaks
  - Streak recovery mechanics

- **Consistency Rewards:**
  - Streak milestone badges
  - Bonus content unlocks
  - Special recognition
  - Personalized encouragement

### 20.3 Reward Mechanisms

#### 20.3.1 Intrinsic Rewards

- **Personalized Insights:**
  - Unlockable in-depth analyses
  - Personal growth recommendations
  - Custom comparison data
  - Advanced visualization options

- **Content Unlocks:**
  - Premium article access
  - Expert interviews
  - Special report access
  - Advanced tool access

#### 20.3.2 Extrinsic Rewards

- **Point System:**
  - Point accumulation for activities
  - Level progression
  - Redeemable rewards
  - Status indicators

- **Tangible Benefits:**
  - Discount codes for premium
  - Early access to new features
  - Exclusive webinar invites
  - Community recognition

### 20.4 Engagement Loops

#### 20.4.1 Core Loops

- **Daily Engagement:**
  - Daily reflection prompts
  - Micro-assessments
  - Insight of the day
  - Streak maintenance

- **Weekly Loops:**
  - Weekly progress summary
  - Challenge completion
  - Community interaction
  - Growth recommendation

#### 20.4.2 Progression Loops

- **Milestone-based Progression:**
  - Level-up mechanics
  - New content unlocks
  - Feature accessibility expansion
  - Achievement tier advancements

- **Mastery Path:**
  - Skill tree concept
  - Specialization options
  - Expert status recognition
  - Mentor role opportunities

### 20.5 Social Comparison

#### 20.5.1 Leaderboards

- **Leaderboard Types:**
  - Achievement point leaderboards
  - Engagement streak leaderboards
  - Community contribution boards
  - Progress velocity boards

- **Implementation Guidelines:**
  - Optional participation
  - Friend-only comparisons
  - Anonymous ranking option
  - Positive competitive framing

#### 20.5.2 Social Sharing

- **Shareable Content:**
  - Achievement unlocks
  - Progress milestones
  - Personality insights
  - Growth journey highlights

- **Sharing Mechanics:**
  - One-click share functionality
  - Customizable share messages
  - Image generation for sharing
  - Private vs. public sharing options

## 21. Offline Functionality

### 21.1 Local Storage Implementation

#### 21.1.1 Data Persistence

- **Persistent Storage Types:**
  - IndexedDB for structured data
  - LocalStorage for simple preferences
  - Cache API for assets and resources
  - Service Worker cache for application shell

- **Data Categories:**
  - User assessment progress
  - Completed but unsynced results
  - Application preferences
  - Recently viewed content

#### 21.1.2 Storage Management

- **Storage Limits:**
  - Size estimation algorithms
  - Prioritized storage allocation
  - Least-recently-used eviction policy
  - Critical data preservation

- **Data Lifecycle:**
  - TTL (Time To Live) for cached data
  - Manual purge options
  - Automatic cleanup of stale data
  - Version-based invalidation

### 21.2 Offline Assessment Capabilities

#### 21.2.1 Offline-First Design

- **Core Functionality:**
  - Complete assessment offline
  - Local result calculation
  - Temporary result display
  - Progress saving at each step

- **Resource Preloading:**
  - Essential assets preloading
  - On-demand loading of secondary resources
  - Adaptive resource loading based on connection
  - Background fetching during idle time

#### 21.2.2 Offline Experience

- **User Interface Adaptations:**
  - Offline mode indicators
  - Graceful degradation of features
  - Clear synchronization status
  - Connection recovery instructions

- **Limited Functionality Mode:**
  - Core assessment availability
  - Basic results viewing
  - Local data management
  - Features requiring connectivity disabled

### 21.3 Data Synchronization

#### 21.3.1 Sync Architecture

- **Sync Model:**
  - Event-based synchronization
  - Delta synchronization for efficiency
  - Priority-based sync queue
  - Conflict resolution strategies

- **Background Sync:**
  - Service Worker background sync registration
  - Periodic sync for critical data
  - Retry strategy with exponential backoff
  - Battery and data-aware synchronization

#### 21.3.2 Conflict Resolution

- **Detection Methods:**
  - Timestamp-based detection
  - Version vector comparison
  - Entity-based conflict identification
  - Change tracking metadata

- **Resolution Strategies:**
  - Server wins by default
  - Client wins for user-generated content
  - Merge strategy for compatible changes
  - User prompt for irreconcilable conflicts

### 21.4 Progressive Loading

#### 21.4.1 Application Shell Architecture

- **Shell Components:**
  - Core navigation structure
  - Essential UI framework
  - Basic interaction handlers
  - Loading state placeholders

- **Shell Caching:**
  - Aggressive caching of shell components
  - Version-based shell updates
  - Shell update notification
  - Background shell refreshing

#### 21.4.2 Content Loading Strategy

- **Progressive Enhancement:**
  - Core content loading first
  - Non-essential content deferred
  - On-demand feature loading
  - Adaptive loading based on connection quality

- **Loading Prioritization:**
  - Critical path resources first
  - Above-the-fold content priority
  - User interaction-dependent loading
  - Predictive preloading based on navigation patterns

## 22. Print and Export Functionality

### 22.1 PDF Generation

#### 22.1.1 PDF Architecture

- **Generation Method:**
  - Server-side PDF rendering
  - PDF.js for client preview
  - Custom templates by report type
  - Dynamic content assembly

- **PDF Quality:**
  - Print-quality resolution (300 DPI)
  - Vector graphics where possible
  - Embedded fonts
  - Color profile management

#### 22.1.2 PDF Design Templates

- **Basic Report Template:**
  - Clean, minimal design
  - Core type information
  - Influence profile
  - Mood state descriptions

- **Comprehensive Report Template:**
  - Detailed type analysis
  - Visual tower representation
  - Growth recommendations
  - Comparative insights

- **Team Report Template:**
  - Team composition overview
  - Interaction dynamics analysis
  - Complementary type patterns
  - Team strength evaluation

### 22.2 Printer-Friendly Layouts

#### 22.2.1 Print Stylesheet

- **Print Optimizations:**
  - Unnecessary element hiding
  - Page break control
  - Font size adjustment
  - Color optimization for printing

- **Page Configuration:**
  - Margins and bleed settings
  - Header and footer inclusion
  - Pagination controls
  - Portrait orientation optimization

#### 22.2.2 Print Preview

- **Preview Functionality:**
  - Browser print preview integration
  - Custom print preview overlay
  - Page count estimation
  - Print setting suggestions

- **Print Options:**
  - Section selection for printing
  - Color/black and white toggle
  - Quality settings
  - Paper size recommendations

### 22.3 Custom Report Configuration

#### 22.3.1 Report Builder

- **Section Selection:**
  - Modular report components
  - Drag-and-drop section ordering
  - Optional section inclusion/exclusion
  - Custom section heading options

- **Content Customization:**
  - Detail level adjustment
  - Emphasis area selection
  - Comparison inclusion options
  - Visualization style selection

#### 22.3.2 Branding Options

- **Customization Elements:**
  - Logo placement
  - Color scheme adaptation
  - Custom header and footer
  - Cover page design

- **Enterprise Branding:**
  - Company template storage
  - Brand style guide integration
  - Approval workflow integration
  - Multi-brand management

### 22.4 Bulk Export Capabilities

#### 22.4.1 Individual Exports

- **Export Formats:**
  - PDF (standard and high-resolution)
  - PNG image of tower visualization
  - JSON data export
  - Plain text summary

- **Export Delivery:**
  - Direct download
  - Email delivery
  - WhatsApp delivery
  - Cloud storage save option

#### 22.4.2 Administrative Exports

- **Bulk Operations:**
  - Team report generation
  - Cohort comparison exports
  - Batch processing queue
  - Progress tracking for large exports

- **Export Scheduling:**
  - Recurring export scheduling
  - Triggered exports on milestones
  - Notification system for completions
  - Retention policy for exports

## 23. Development and Deployment Workflow

### 23.1 Development Environment

#### 23.1.1 Local Setup

- **Development Requirements:**
  - Node.js development environment
  - MongoDB local instance
  - Redis for local caching
  - Docker Compose for services

- **Configuration Management:**
  - Environment-specific variables
  - Secret management (dotenv)
  - Feature flag configuration
  - Local override capabilities

#### 23.1.2 Code Organization

- **Repository Structure:**
  - Monorepo architecture
  - Client and server separation
  - Shared module patterns
  - Asset management strategy

- **Module Management:**
  - NPM workspace configuration
  - Dependency management strategy
  - Version pinning policy
  - Package auditing procedure

### 23.2 CI/CD Pipeline

#### 23.2.1 Continuous Integration

- **Build Process:**
  - Source code linting
  - Unit test execution
  - Integration test suite
  - Code coverage analysis

- **Quality Gates:**
  - Minimum test coverage thresholds
  - Performance benchmark testing
  - Accessibility compliance checking
  - Security vulnerability scanning

#### 23.2.2 Continuous Deployment

- **Deployment Environments:**
  - Development environment
  - Staging environment
  - Production environment
  - Sandbox environment for demos

- **Deployment Process:**
  - Automated deployment triggers
  - Blue/Green deployment strategy
  - Canary release capability
  - Rollback procedures

### 23.3 Testing Requirements

#### 23.3.1 Testing Levels

- **Unit Testing:**
  - Jest for JavaScript testing
  - Component testing with React Testing Library
  - API endpoint unit tests
  - Utility function tests

- **Integration Testing:**
  - API integration test suite
  - Database integration tests
  - Cache interaction testing
  - Third-party service mocking

- **End-to-End Testing:**
  - Cypress for E2E testing
  - Critical user journey tests
  - Cross-browser testing matrix
  - Mobile device simulation

#### 23.3.2 Specialized Testing

- **Performance Testing:**
  - Lighthouse CI integration
  - Bundle size analysis
  - API response time testing
  - Load testing with predefined scenarios

- **Accessibility Testing:**
  - Automated a11y testing with axe
  - Manual screen reader testing
  - Keyboard navigation testing
  - Color contrast verification

- **Security Testing:**
  - OWASP vulnerability scanning
  - Dependency security auditing
  - Penetration testing schedule
  - API security testing

### 23.4 Code Quality Standards

#### 23.4.1 Style Guidelines

- **Coding Standards:**
  - ESLint configuration
  - Prettier for code formatting
  - TypeScript strict mode
  - React best practices enforcement

- **Code Review Process:**
  - Pull request template
  - Required reviewer guidelines
  - Review checklist
  - Merge requirements

#### 23.4.2 Documentation Requirements

- **Code Documentation:**
  - JSDoc for function documentation
  - Component props documentation
  - API endpoint documentation
  - Architecture decision records

- **Technical Documentation:**
  - System architecture documentation
  - Database schema documentation
  - API documentation with Swagger
  - Deployment and operations guide

### 23.5 Version Control and Release Management

#### 23.5.1 Version Control Strategy

- **Branching Strategy:**
  - Gitflow workflow implementation
  - Protected main branch
  - Feature branch naming convention
  - Release branch management

- **Commit Standards:**
  - Conventional Commits format
  - Issue tracking references
  - Signed commits requirement
  - Linear history preference

#### 23.5.2 Release Management

- **Versioning:**
  - Semantic versioning adherence
  - Changelog generation
  - Version tagging in repository
  - Release notes compilation

- **Release Coordination:**
  - Release planning process
  - Feature freeze timing
  - Release candidate testing
  - Staged rollout strategy## 13. User Management and Administrative Features

### 13.1 User Authentication System

#### 13.1.1 Registration Process

- **Registration Form:**
  - Full name (required)
  - Email address (required)
  - Phone number (required)
    - Country code dropdown selector
    - Phone number validation based on country format
    - WhatsApp verification option
  - Password (with strength requirements)
  - Terms of service acceptance checkbox
  - Privacy policy acceptance checkbox

- **Email Verification:**
  - Verification email with unique link
  - Account remains limited until verified
  - Resend verification option

- **Phone Verification (for WhatsApp):**
  - SMS code verification
  - Alternative WhatsApp message verification
  - Skip option with limited functionality

- **Social Authentication (Optional):**
  - Google login integration (still requires phone number)
  - Facebook login integration (still requires phone number)
  - Apple login integration (still requires phone number)

#### 13.1.2 Login System

- **Standard Login:**
  - Email/password combination
  - "Remember me" option
  - Forgot password functionality

- **Session Management:**
  - JWT token-based authentication
  - 30-day token expiration
  - Device tracking for security

- **Security Features:**
  - Rate limiting for failed attempts
  - Two-factor authentication option
  - Suspicious activity detection

#### 13.1.3 User Profile Management

- **User Dashboard:**
  - View past assessment results
  - Track progress over time
  - Account settings management

- **Profile Details:**
  - Update personal information
  - Change password
  - Notification preferences
  - Delete account option
  - Update WhatsApp delivery preferences

### 13.2 Administrative System

#### 13.2.1 Admin Dashboard

- **Analytics Overview:**
  - Total registered users
  - Active users (daily/weekly/monthly)
  - Assessment completions
  - User retention metrics

- **Data Visualization:**
  - Distribution of personality types
  - Demographic breakdowns
  - Engagement metrics charts
  - User journey funnel analysis

- **Type Distribution Analytics:**
  - Percentage breakdown of primary types
  - Influence (wing) distribution
  - Mood state patterns
  - Subtype distribution

#### 13.2.2 User Management

- **User Search & Filtering:**
  - Search by email, name, or ID
  - Filter by registration date
  - Filter by assessment completion status
  - Filter by personality type

- **User Actions:**
  - View user details
  - Reset user password
  - Disable/enable accounts
  - Delete user data
  - Send manual WhatsApp reports

#### 13.2.3 Content Management

- **Report Template Editor:**
  - Edit type descriptions
  - Update influence descriptions
  - Modify mood state descriptions
  - Customize subtype descriptions

- **Assessment Configuration:**
  - Adjust scoring algorithms
  - Update question content
  - Enable/disable features
  - Adjust visualization parameters

#### 13.2.4 Export & Reporting

- **Data Export:**
  - CSV export of user data
  - JSON export of assessment results
  - Anonymized data for research
  - Custom report generation

- **Scheduled Reports:**
  - Weekly user activity summary
  - Monthly type distribution report
  - Conversion rate analysis
  - System performance metrics

#### 13.2.5 WhatsApp Integration Management

- **Template Management:**
  - Create and manage WhatsApp message templates
  - Configure WhatsApp report formats
  - Set up automatic delivery schedules
  - Track delivery statistics

- **Bulk Operations:**
  - Send batch reports to user segments
  - Schedule follow-up messages
  - Create drip campaigns
  - Track engagement metrics

### 13.3 Home Page and Marketing Features

#### 13.3.1 Landing Page Design

- **Hero Section:**
  - Engaging headline focusing on self-discovery
  - Brief description of the assessment's value
  - Clear call-to-action button to begin assessment
  - Sample tower visualization as visual hook

- **Feature Highlights:**
  - Visual explanation of the four phases
  - Sample results preview
  - Testimonials from users
  - Benefits of personality discovery

- **Trust Elements:**
  - Scientific methodology statement
  - Privacy commitment
  - Completion time (5-7 minutes)
  - Number of users who have completed the assessment

#### 13.3.2 Onboarding Flow

- **Welcome Screen:**
  - Brief introduction to the concept
  - How the assessment works explanation
  - What users will learn about themselves
  - Option to create account or continue as guest

- **Preparation Steps:**
  - Environment preparation suggestions
  - Mindset recommendations
  - Time requirement reminder
  - Privacy assurance

#### 13.3.3 Results Sharing

- **Social Media Integration:**
  - Share results on Facebook, Twitter, LinkedIn
  - Customizable sharing text
  - Image of tower visualization for sharing
  - Shortened URL to specific results

- **WhatsApp Sharing:**
  - Direct WhatsApp sharing of results summary
  - Option to send full report via WhatsApp
  - Personalized message template
  - QR code for easy sharing

- **Email Sharing:**
  - Send results to friends or colleagues
  - Personalized message option
  - PDF attachment of full report
  - Invitation to take the assessment

### 13.4 Privacy and Data Management

#### 13.4.1 Privacy Policy Requirements

- **Data Collection Disclosure:**
  - Clear explanation of data collected
  - Purpose of data collection
  - Data sharing policies
  - Data retention timeframes

- **User Rights:**
  - Right to access personal data
  - Right to correct information
  - Right to delete account and data
  - Right to export personal data

#### 13.4.2 Data Storage Requirements

- **User Data:**
  - Encrypted storage of personal information
  - Anonymization of assessment data for research
  - Regular backup procedures
  - Data purging schedule for inactive accounts

- **Assessment Results:**
  - Secure storage of individual results
  - Access controls for result sharing
  - Option for automatic deletion after time period
  - Separation of identifiable information from results

#### 13.4.3 Consent Management

- **Consent Tracking:**
  - Record of privacy policy acceptance
  - Consent for data usage in research
  - Marketing communication opt-in
  - Timestamp of all consent actions
  - Specific WhatsApp messaging consent

- **Preference Center:**
  - Granular control over data usage
  - Communication preferences
  - Data retention preferences
  - Third-party sharing preferences
  - WhatsApp message frequency settings

### 13.5 Support and Documentation

#### 13.5.1 Help Center

- **FAQ Section:**
  - Assessment methodology
  - Account management
  - Results interpretation
  - Privacy and security

- **Tutorial Content:**
  - Interactive guide to the assessment
  - Video walkthrough of features
  - Understanding your results guide
  - Personal growth recommendations

#### 13.5.2 Support System

- **Contact Methods:**
  - Email support form
  - WhatsApp support option
  - Chat support option
  - Knowledge base integration
  - Feedback collection mechanism

- **Issue Tracking:**
  - Bug reporting system
  - Feature request submission
  - Status updates for reported issues
  - Resolution notification

### 13.6 Mobile Optimization

#### 13.6.1 Responsive Design

- **Mobile-First Approach:**
  - Touch-optimized interface
  - Adaptive layouts for all screen sizes
  - Portrait and landscape orientation support
  - Native-like experience on mobile browsers

- **Performance Optimization:**
  - Image compression for faster loading
  - Minimal network requests
  - Offline capability for assessment process
  - Low bandwidth mode option

#### 13.6.2 Progressive Web App Features

- **Installation:**
  - Add to home screen functionality
  - App-like experience after installation
  - Custom icons and splash screens
  - Offline access to key features

- **Push Notifications:**
  - Results ready notifications
  - Assessment reminder notifications
  - New insights available notifications
  - Custom scheduled notifications

### 13.7 Monetization Options

#### 13.7.1 Freemium Model

- **Free Tier:**
  - Basic assessment
  - Limited results access
  - Core personality type identification
  - Basic visualization

- **Premium Tier:**
  - Comprehensive assessment
  - Detailed reports with all components
  - Advanced visualizations
  - Historical tracking and comparisons
  - WhatsApp delivery of full reports

#### 13.7.2 Enterprise Solutions

- **Group Assessment:**
  - Bulk user creation
  - Team dynamics analysis
  - Comparative reporting
  - Administrative dashboard for team leaders

- **Corporate Integration:**
  - API access for HR systems
  - Custom branding options
  - Tailored report templates
  - Advanced analytics for workforce insights

### 13.8 Localization and Internationalization

#### 13.8.1 Language Support

- **Multi-language Interface:**
  - English (default)
  - Spanish
  - French
  - German
  - Mandarin Chinese
  - Japanese
  - Additional languages based on market demand

- **Translation Management:**
  - Centralized string repository
  - Context-aware translation
  - Locale-specific formatting
  - Right-to-left language support

#### 13.8.2 Cultural Adaptation

- **Regional Customization:**
  - Culturally appropriate examples
  - Localized imagery and metaphors
  - Region-specific report phrasing
  - Cultural nuance consideration in type descriptions

All features described in this section must adhere to the terminology requirements specified in section 1.5, using consistent naming conventions throughout the user interface and content.# Comprehensive Technical Specification: Personality Mosaic Assessment System

## 0. Document Control

- **Version:** 1.0
- **Date:** May 19, 2025
- **Purpose:** Complete technical specification for the Personality Mosaic Assessment System React application
- **Target Audience:** Replit AI / React Developers
- **CRITICAL INSTRUCTION:** Replit must refer to this specification before implementing ANY component or feature. All implementations must be verified against this document.

## 1. Project Overview and Architecture

### 1.1 Project Goal

Create an engaging, visually interactive personality assessment system that identifies Enneagram types, wings, arrows, states, and subtypes within a 5-7 minute gamified experience, using a progressive building metaphor.

### 1.2 Core Concepts

- **Building Metaphor:** Users build a personality tower through visual choices
- **Progressive Assessment:** Four distinct phases (Foundation, Building Blocks, Colors, Details)
- **Mathematical Mapping:** Precise algorithms to determine personality types
- **Visual Feedback:** Real-time visualization of personality construction

### 1.3 User Journey Flow

Welcome Screen (with optional login) →  
Foundation Stone Selection →  
Building Block Selection →  
Color Palette Adjustment →  
Detail Element Distribution →  
Results Visualization and Report

### 1.4 Technical Architecture Overview

- **Frontend:** React-based SPA with client-side processing
- **State Management:** React Context API / Zustand
- **Animation Engine:** Framer Motion for animations
- **Visualization:** SVG for 2D visuals, Three.js option for 3D
- **Backend (optional):** Node.js/Express for authentication and data storage
- **Database (optional):** MongoDB for user data and results storage

### 1.5 CRITICAL TERMINOLOGY REQUIREMENTS

**IMPORTANT:** The final application MUST adhere to the following terminology guidelines:

1. **NEVER use the term "Enneagram"** anywhere in the user-facing application. This includes UI elements, reports, visualizations, and documentation presented to users.

2. **Type 6 is always called "Sentinel"** NOT "Loyalist" throughout all user-facing content.

3. **Replace "wings" terminology** with the following format:
   - Instead of "1w9" → Use "Reformer 9"
   - Instead of "1w2" → Use "Reformer 2"
   - For all types, use the type name followed by the influencing number

4. **Replace arrows/direction terminology** with simple mood states:
   - NEVER reference "moving toward" any type
   - Simply describe "When you're in a good mood, you are..." 
   - Simply describe "When you're in a bad mood, you are..."
   - Avoid ALL language suggesting movement between types

5. **When referring to influences** use the format:
   - "The [Primary Type Number] influence" (e.g., "The Reformer 9 influence")
   - NEVER use other type names in the influence description (e.g., don't say "The Peacemaker influence")
   - Always refer to the influence as the primary type with the influencing number

6. **All internal algorithms** may continue to use technical terms like "wing" and "arrow" in the codebase, but any user-visible text must use the approved alternative terminology.

7. **Result reports** must be written using only the approved terminology.

All team members must review and understand these terminology requirements before beginning implementation.

- **Version:** 1.0
- **Date:** May 19, 2025
- **Purpose:** Complete technical specification for the Personality Mosaic Assessment System React application
- **Target Audience:** Replit AI / React Developers
- **CRITICAL INSTRUCTION:** Replit must refer to this specification before implementing ANY component or feature. All implementations must be verified against this document.

## 1. Project Overview and Architecture

### 1.1 Project Goal

Create an engaging, visually interactive personality assessment system that identifies Enneagram types, wings, arrows, states, and subtypes within a 5-7 minute gamified experience, using a progressive building metaphor.

### 1.2 Core Concepts

- **Building Metaphor:** Users build a personality tower through visual choices
- **Progressive Assessment:** Four distinct phases (Foundation, Building Blocks, Colors, Details)
- **Mathematical Mapping:** Precise algorithms to determine personality types
- **Visual Feedback:** Real-time visualization of personality construction

### 1.3 User Journey Flow

Welcome Screen (with optional login) →  
Foundation Stone Selection →  
Building Block Selection →  
Color Palette Adjustment →  
Detail Element Distribution →  
Results Visualization and Report

### 1.4 Technical Architecture Overview

- **Frontend:** React-based SPA with client-side processing
- **State Management:** React Context API / Zustand
- **Animation Engine:** Framer Motion for animations
- **Visualization:** SVG for 2D visuals, Three.js option for 3D
- **Backend (optional):** Node.js/Express for authentication and data storage
- **Database (optional):** MongoDB for user data and results storage

## 2. Comprehensive Design System

### 2.1 Color System

#### 2.1.1 Primary Palette

- **Blue:** #1e40af (Primary), #3b82f6 (Light), #1e3a8a (Dark)
- **Green:** #16a34a (Primary), #86efac (Light), #14532d (Dark)
- **Orange:** #f97316 (Primary), #fdba74 (Light), #c2410c (Dark)
- **Purple:** #9333ea (Primary), #c084fc (Light), #6b21a8 (Dark)

#### 2.1.2 UI Colors

- **Background:** #ffffff (Primary), #f8fafc (Secondary), #f1f5f9 (Tertiary)
- **Text:** #0f172a (Primary), #334155 (Secondary), #64748b (Tertiary)
- **Border:** #e2e8f0 (Light), #cbd5e1 (Medium), #94a3b8 (Dark)

#### 2.1.3 State Colors

- **Healthy:** #22c55e (Primary), #4ade80 (Light), #166534 (Dark)
- **Average:** #f59e0b (Primary), #fcd34d (Light), #b45309 (Dark)
- **Unhealthy:** #ef4444 (Primary), #f87171 (Light), #b91c1c (Dark)

#### 2.1.4 Exact Gradient Definitions

```css
/* Foundation Stone Gradients */
.stone-head { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); }
.stone-heart { background: linear-gradient(135deg, #f97316 0%, #fdba74 100%); }
.stone-body { background: linear-gradient(135deg, #16a34a 0%, #86efac 100%); }

/* Building Block Gradients */
.block-1 { background: linear-gradient(135deg, #1e3a8a 0%, #60a5fa 100%); }
.block-2 { background: linear-gradient(135deg, #c2410c 0%, #fb923c 100%); }
/* [Additional 7 block gradients specified] */

/* State Gradients */
.healthy-gradient { background: linear-gradient(180deg, #166534 0%, #22c55e 100%); }
.average-gradient { background: linear-gradient(180deg, #b45309 0%, #f59e0b 100%); }
.unhealthy-gradient { background: linear-gradient(180deg, #b91c1c 0%, #ef4444 100%); }
```

### 2.2 Typography System

#### 2.2.1 Font Families

- **Headings:** Inter, sans-serif
- **Body:** Inter, sans-serif
- **Monospace:** (if needed) JetBrains Mono, monospace

#### 2.2.2 Font Sizes

```css
/* Font Size Scale */
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem; /* 36px */
```

#### 2.2.3 Font Weights

```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### 2.2.4 Line Heights

```css
--line-height-tight: 1.2;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

#### 2.2.5 Letter Spacing

```css
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;
```

### 2.3 Spacing System

```css
/* Spacing Scale */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### 2.4 Shadow System

```css
/* Shadow Scale */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

/* Component-Specific Shadows */
--shadow-stone: 0 4px 12px rgba(0, 0, 0, 0.2);
--shadow-stone-hover: 0 8px 16px rgba(0, 0, 0, 0.25);
--shadow-block: 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-block-hover: 0 6px 12px rgba(0, 0, 0, 0.2);
--shadow-token: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-token-drag: 0 4px 8px rgba(0, 0, 0, 0.2);
```

### 2.5 Border System

```css
/* Border Widths */
--border-width-none: 0;
--border-width-thin: 1px;
--border-width-thick: 2px;
--border-width-thicker: 4px;

/* Border Radii */
--border-radius-none: 0;
--border-radius-sm: 0.125rem; /* 2px */
--border-radius-md: 0.375rem; /* 6px */
--border-radius-lg: 0.5rem; /* 8px */
--border-radius-xl: 0.75rem; /* 12px */
--border-radius-2xl: 1rem; /* 16px */
--border-radius-full: 9999px;
```

### 2.6 Animation System

```css
/* Timing Functions */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Durations */
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;
```

## 3. Foundation Stone Experience (Phase 1)

### 3.1 Interaction Design

- User sees 3 "Foundation Stones" at a time
- Each stone has unique shape, gradient, and contains 2-3 core values/traits
- User selects one stone from each set (9 total sets, shown 3 at a time)
- Selection adds stone to a circular foundation base visualization

### 3.2 Visual Design Specifications

#### 3.2.1 Foundation Stones

- **Size:** 160px × 160px
- **Shape:** Irregular hexagon with subtle variations
- **Background:** Gradient based on stone type (see color specifications)
- **Border:** 2px solid white with 8px border radius
- **Shadow:** 0 4px 12px rgba(0,0,0,0.2)
- **Content:** 2-3 words in white text (Inter SemiBold, 16px)
- **Hover Effect:** Scale to 1.05×, shadow increase
- **Selected State:** Glow effect, checkmark indicator

#### 3.2.2 Stone Set Container

- **Layout:** 3 stones side by side with equal spacing
- **Background:** Subtle light background (#f8fafc)
- **Width:** 100% of container, max-width 800px
- **Spacing:** 24px between stones
- **Instruction Text:** Above stones, Inter Regular 18px

#### 3.2.3 Progress Visualization

- **Foundation Base:** Circular base (320px diameter)
- **Stone Placement:** Stones appear to be placed around the circle
- **Progress Indicator:** X of 9 sets completed
- **Animation:** Smooth transition as stones appear in foundation

### 3.3 Stone Content and Mapping

#### 3.3.1 Complete Stone Content for All Nine Sets

**Set 1: Decision-Making Center**
- **Stone A (Head):** ANALYSIS • LOGIC • THINKING
- **Stone B (Heart):** CONNECTION • EMPATHY • FEELING 
- **Stone C (Body):** ACTION • INSTINCT • MOVEMENT

**Set 2: Core Motivation**
- **Stone A (Fear):** SECURITY • PREPARATION • CAUTION
- **Stone B (Shame):** AUTHENTICITY • IMAGE • MEANING
- **Stone C (Anger):** JUSTICE • CONTROL • STRENGTH

**Set 3: Energy Direction**
- **Stone A (Withdrawn):** REFLECTION • DEPTH • PRIVACY
- **Stone B (Assertive):** ACHIEVEMENT • INFLUENCE • IMPACT
- **Stone C (Compliant):** STRUCTURE • SUPPORT • HARMONY

**Set 4: Social Approach**
- **Stone A (Detached):** OBJECTIVITY • PERSPECTIVE • SPACE
- **Stone B (Attachment):** CLOSENESS • INTIMACY • BONDING
- **Stone C (Autonomy):** INDEPENDENCE • SELF-RELIANCE • FREEDOM

**Set 5: Processing Style**
- **Stone A (Conceptual):** SYSTEMS • CONCEPTS • IDEAS
- **Stone B (Emotional):** EXPRESSION • MOOD • FEELING
- **Stone C (Practical):** RESULTS • EFFICIENCY • UTILITY

**Set 6: Stress Reaction**
- **Stone A (Overthinking):** VIGILANCE • ANALYSIS • FORESIGHT
- **Stone B (Image-focus):** RECOGNITION • IDENTITY • UNIQUENESS
- **Stone C (Control-seeking):** AUTHORITY • POWER • DIRECTION

**Set 7: Conflict Style**
- **Stone A (Avoiding):** PEACE • MEDIATION • COMPROMISE
- **Stone B (Accommodating):** SUPPORT • FLEXIBILITY • ADAPTATION
- **Stone C (Confronting):** DIRECTNESS • CHALLENGE • HONESTY

**Set 8: Success Definition**
- **Stone A (Correctness):** ACCURACY • PRINCIPLES • IMPROVEMENT
- **Stone B (Approval):** CONNECTION • ACKNOWLEDGMENT • APPRECIATION
- **Stone C (Autonomy):** MASTERY • ACHIEVEMENT • CAPABILITY

**Set 9: Relationship Priority**
- **Stone A (Independence):** AUTONOMY • SELF-SUFFICIENCY • SPACE
- **Stone B (Interdependence):** MUTUALITY • SHARING • RECIPROCITY
- **Stone C (Guidance):** LEADERSHIP • MENTORSHIP • DIRECTION

### 3.4 Complete Type-Mapping Algorithm

```javascript
// Stone selection mapping algorithm
function determinePersonalityType(selections) {
  // Initialize scores for each type
  const typeScores = {
    type1: 0, type2: 0, type3: 0, type4: 0, type5: 0,
    type6: 0, type7: 0, type8: 0, type9: 0
  };

  // Weights for each selection set
  const setWeights = [2.0, 2.5, 1.5, 1.0, 1.0, 1.5, 1.0, 1.0, 1.0];

  // Process selections and update scores
  // Set 1: Decision-Making Center
  if (selections[0] === 0) { // Stone A (Head)
    typeScores.type5 += 3 * setWeights[0];
    typeScores.type6 += 2 * setWeights[0];
    typeScores.type7 += 1 * setWeights[0];
  } else if (selections[0] === 1) { // Stone B (Heart)
    typeScores.type2 += 3 * setWeights[0];
    typeScores.type3 += 2 * setWeights[0];
    typeScores.type4 += 3 * setWeights[0];
  } else if (selections[0] === 2) { // Stone C (Body)
    typeScores.type1 += 2 * setWeights[0];
    typeScores.type8 += 3 * setWeights[0];
    typeScores.type9 += 2 * setWeights[0];
  }

  // Set 2: Core Motivation
  if (selections[1] === 0) { // Stone A (Fear)
    typeScores.type5 += 2 * setWeights[1];
    typeScores.type6 += 3 * setWeights[1];
    typeScores.type7 += 1 * setWeights[1];
  } else if (selections[1] === 1) { // Stone B (Shame)
    typeScores.type2 += 2 * setWeights[1];
    typeScores.type3 += 3 * setWeights[1];
    typeScores.type4 += 3 * setWeights[1];
  } else if (selections[1] === 2) { // Stone C (Anger)
    typeScores.type1 += 3 * setWeights[1];
    typeScores.type8 += 3 * setWeights[1];
    typeScores.type9 += 2 * setWeights[1];
  }

  // Continue with sets 3-9 following the same pattern
  // [Additional scoring logic for sets 3-9]

  // Calculate confidence scores
  const totalScore = Object.values(typeScores).reduce((sum, score) => sum + score, 0);
  const normalizedScores = {};
  for (const type in typeScores) {
    normalizedScores[type] = typeScores[type] / totalScore;
  }

  // Find the highest scoring type
  let highestType = 'type1';
  let highestScore = normalizedScores.type1;
  for (const type in normalizedScores) {
    if (normalizedScores[type] > highestScore) {
      highestScore = normalizedScores[type];
      highestType = type;
    }
  }

  // Calculate confidence (difference between top score and average of others)
  const otherScores = Object.values(normalizedScores).filter(score => score !== highestScore);
  const avgOtherScore = otherScores.reduce((sum, score) => sum + score, 0) / otherScores.length;
  const confidence = highestScore - avgOtherScore;

  // Find alternative types (next highest scores)
  const typeEntries = Object.entries(normalizedScores)
    .filter(([type]) => type !== highestType)
    .sort((a, b) => b[1] - a[1]);
  const alternatives = typeEntries.slice(0, 2).map(entry => entry[0]);

  return {
    primaryType: highestType.substring(4), // Remove 'type' prefix
    confidence: confidence,
    alternatives: alternatives.map(alt => alt.substring(4)),
    typeMap: normalizedScores
  };
}
```

### 3.5 Complete Stone-to-Type Mapping Table

| Set 1 | Set 2 | Set 3 | Most Likely Type | Secondary Type | Confidence |
|-------|-------|-------|------------------|----------------|------------|
| A (Head) | A (Fear) | A (Withdrawn) | Type 5 - Investigator | Type 6 | High |
| A (Head) | A (Fear) | B (Assertive) | Type 7 - Enthusiast | Type 5 | Medium |
| A (Head) | A (Fear) | C (Compliant) | Type 6 - Loyalist | Type 5 | High |
| A (Head) | B (Shame) | A (Withdrawn) | Type 4 - Individualist | Type 5 | Medium |
| A (Head) | B (Shame) | B (Assertive) | Type 3 - Achiever | Type 7 | Low |
| A (Head) | B (Shame) | C (Compliant) | Type 5 - Investigator | Type 4 | Medium |
| A (Head) | C (Anger) | A (Withdrawn) | Type 5 - Investigator | Type 8 | Medium |
| A (Head) | C (Anger) | B (Assertive) | Type 7 - Enthusiast | Type 8 | Medium |
| A (Head) | C (Anger) | C (Compliant) | Type 6 - Loyalist | Type 1 | Medium |
| B (Heart) | A (Fear) | A (Withdrawn) | Type 4 - Individualist | Type 6 | Medium |
| B (Heart) | A (Fear) | B (Assertive) | Type 3 - Achiever | Type 7 | Medium |
| B (Heart) | A (Fear) | C (Compliant) | Type 6 - Loyalist | Type 2 | Low |
| B (Heart) | B (Shame) | A (Withdrawn) | Type 4 - Individualist | Type 3 | High |
| B (Heart) | B (Shame) | B (Assertive) | Type 3 - Achiever | Type 2 | High |
| B (Heart) | B (Shame) | C (Compliant) | Type 2 - Helper | Type 4 | Medium |
| B (Heart) | C (Anger) | A (Withdrawn) | Type 4 - Individualist | Type 1 | Medium |
| B (Heart) | C (Anger) | B (Assertive) | Type 3 - Achiever | Type 8 | Medium |
| B (Heart) | C (Anger) | C (Compliant) | Type 2 - Helper | Type 1 | Medium |
| C (Body) | A (Fear) | A (Withdrawn) | Type 9 - Peacemaker | Type 5 | Medium |
| C (Body) | A (Fear) | B (Assertive) | Type 8 - Challenger | Type 7 | Low |
| C (Body) | A (Fear) | C (Compliant) | Type 6 - Loyalist | Type 9 | Medium |
| C (Body) | B (Shame) | A (Withdrawn) | Type 9 - Peacemaker | Type 4 | Medium |
| C (Body) | B (Shame) | B (Assertive) | Type 3 - Achiever | Type 8 | Low |
| C (Body) | B (Shame) | C (Compliant) | Type 9 - Peacemaker | Type 2 | Medium |
| C (Body) | C (Anger) | A (Withdrawn) | Type 9 - Peacemaker | Type 5 | Medium |
| C (Body) | C (Anger) | B (Assertive) | Type 8 - Challenger | Type 3 | High |
| C (Body) | C (Anger) | C (Compliant) | Type 1 - Reformer | Type 6 | High |

*Note: This table represents the primary type determination based on the first three sets of stone selections. Subsequent sets further refine the type identification, especially in cases with medium or low confidence. The algorithm detailed in section 3.4 applies additional weighting based on all nine stone sets to determine the final type with higher accuracy.*

### 3.6 Implementation Requirements

- Create reusable Stone component with props for content and appearance
- Implement selection tracking and visual feedback
- Store selections in application state
- Calculate intermediate type probabilities after each selection

### 3.7 Component Example - Foundation Stone

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Stone.css';

const stoneVariants = {
  initial: { scale: 0.95, opacity: 0.8 },
  hover: {
    scale: 1.05,
    opacity: 1,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)"
  },
  tap: { scale: 0.98 },
  selected: {
    scale: 1.05,
    opacity: 1,
    boxShadow: "0 0 12px 4px rgba(255, 255, 255, 0.3), 0 8px 16px rgba(0, 0, 0, 0.25)"
  }
};

const Stone = ({
  id,
  type,
  values,
  isSelected,
  onSelect
}) => {
  // Determine gradient class based on type
  const gradientClass = `stone-${type}`;

  return (
    <motion.div
      className={`stone ${gradientClass} ${isSelected ? 'selected' : ''}`}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={isSelected ? "selected" : "initial"}
      variants={stoneVariants}
      onClick={() => onSelect(id)}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="stone-content">
        {values.map((value, index) => (
          <div key={index} className="stone-value">
            {value}
          </div>
        ))}
      </div>
      {isSelected && (
        <div className="stone-selected-indicator">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="white"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default Stone;
```

### 3.8 CSS Implementation for Stone

```css
.stone {
  width: 160px;
  height: 160px;
  border-radius: var(--border-radius-lg);
  padding: var(--space-4);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: var(--shadow-stone);
  user-select: none;
}

.stone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: white;
  text-align: center;
}

.stone-value {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  line-height: var(--line-height-tight);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.stone-selected-indicator {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  width: 28px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Stone type gradients */
.stone-head {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
}

.stone-heart {
  background: linear-gradient(135deg, #f97316 0%, #fdba74 100%);
}

.stone-body {
  background: linear-gradient(135deg, #16a34a 0%, #86efac 100%);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .stone {
    width: 140px;
    height: 140px;
  }
  .stone-value {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .stone {
    width: 120px;
    height: 120px;
    padding: var(--space-3);
  }
  .stone-value {
    font-size: var(--font-size-xs);
  }
}
```

## 4. Building Block Experience (Phase 2)

### 4.1 Interaction Design

- Based on Foundation results, user sees 4 pairs of "Building Blocks"
- Each pair represents opposing tendencies (e.g., moving toward vs. away)
- User makes A/B choice for each pair
- Selection adds block to their personality tower visualization

### 4.2 Visual Design Specifications

#### 4.2.1 Building Block Pairs

- **Size:** 200px × 120px per block
- **Shape:** Rectangles with unique shape variations
- **Background:** Gradient based on block type
- **Border:** 2px solid white with 6px border radius
- **Shadow:** 0 4px 8px rgba(0,0,0,0.15)
- **Content:** Short phrase describing tendency (Inter Medium, 16px)
- **Hover Effect:** Scale to 1.03×, shadow increase
- **Selected State:** Glow effect, color intensification

#### 4.2.2 Block Pair Container

- **Layout:** Two blocks side by side
- **Background:** None
- **Width:** 100% of container, max-width 600px
- **Spacing:** 40px between blocks, 32px between pairs
- **Question Text:** Above each pair, Inter SemiBold 18px

#### 4.2.3 Tower Visualization

- **Base:** Foundation from Phase 1
- **Building:** Blocks stack visually on the foundation
- **Animation:** Each selection causes block to fly to tower position

### 4.3 Block Content and Mapping

#### 4.3.1 Influence Determination Blocks (Previously "Wing Determination")

**For Type 1 (Reformer)**
- **Block A (Reformer 9):** "I seek peace and maintain calm while upholding standards"
- **Block B (Reformer 2):** "I help others improve and feel responsible for their growth"

**For Type 2 (Helper)**
- **Block A (Helper 1):** "I support others through structure and principled service"
- **Block B (Helper 3):** "I help others while maintaining a positive, successful image"

**For Type 3 (Achiever)**
- **Block A (Achiever 2):** "I succeed through connecting with and helping others"
- **Block B (Achiever 4):** "I strive to be unique and authentic in my accomplishments"

**For Type 4 (Individualist)**
- **Block A (Individualist 3):** "I express myself while maintaining a successful image"
- **Block B (Individualist 5):** "I explore my identity through knowledge and understanding"

**For Type 5 (Investigator)**
- **Block A (Investigator 4):** "I observe deeply and value emotional understanding"
- **Block B (Investigator 6):** "I analyze methodically and prepare for contingencies"

**For Type 6 (Sentinel)**
- **Block A (Sentinel 5):** "I seek security through knowledge and understanding"
- **Block B (Sentinel 7):** "I manage anxiety by staying positive and keeping options open"

**For Type 7 (Enthusiast)**
- **Block A (Enthusiast 6):** "I pursue enjoyment while maintaining security and reliability"
- **Block B (Enthusiast 8):** "I seek freedom and assert myself to maximize experiences"

**For Type 8 (Challenger)**
- **Block A (Challenger 7):** "I pursue opportunities with enthusiasm and optimism"
- **Block B (Challenger 9):** "I assert myself while maintaining inner peace and harmony"

**For Type 9 (Peacemaker)**
- **Block A (Peacemaker 8):** "I maintain peace while occasionally asserting myself"
- **Block B (Peacemaker 1):** "I seek harmony while maintaining clear principles"

#### 4.3.2 Mood State Blocks (Previously "Integration/Disintegration")

**For Type 1 (Reformer)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more spontaneous and open to possibilities"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am more emotional and sensitive to flaws"

**For Type 2 (Helper)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more authentic and in touch with my needs"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am more controlling and demanding"

**For Type 3 (Achiever)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more loyal and committed to others"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am more disengaged and indecisive"

**For Type 4 (Individualist)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more disciplined and principled"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am more dependent on others' approval"

**For Type 5 (Investigator)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more assertive and take confident action"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am scattered and seek excessive distractions"

**For Type 6 (Sentinel)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more trusting and at peace"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am more image-conscious and competitive"

**For Type 7 (Enthusiast)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more focused and thoughtful"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am more critical and perfectionistic"

**For Type 8 (Challenger)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more caring and emotionally open"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am more detached and isolated"

**For Type 9 (Peacemaker)**
- **Block A (Good Mood):** "When I'm in a good mood, I am more motivated and productive"
- **Block B (Bad Mood):** "When I'm in a bad mood, I am more anxious and suspicious"

### 4.4 Implementation Requirements

- Create reusable BuildingBlock component
- Implement selection tracking with visual feedback
- Update application state with influence type and mood direction determinations
- Update tower visualization with each selection

### 4.5 Influence Calculation Algorithm (Previously "Wing Calculation")

```javascript
function determineInfluence(primaryType, blockSelections) {
  // First block selection determines primary influence
  const primaryInfluenceSelection = blockSelections[0];

  // Influence mapping based on primary type
  const influenceMap = {
    '1': primaryInfluenceSelection === 0 ? '9' : '2',
    '2': primaryInfluenceSelection === 0 ? '1' : '3',
    '3': primaryInfluenceSelection === 0 ? '2' : '4',
    '4': primaryInfluenceSelection === 0 ? '3' : '5',
    '5': primaryInfluenceSelection === 0 ? '4' : '6',
    '6': primaryInfluenceSelection === 0 ? '5' : '7',
    '7': primaryInfluenceSelection === 0 ? '6' : '8',
    '8': primaryInfluenceSelection === 0 ? '7' : '9',
    '9': primaryInfluenceSelection === 0 ? '8' : '1'
  };

  // Second block selection determines influence strength
  const influenceStrength = blockSelections[1] === 0 ? 'strong' : 'moderate';

  // Calculate confidence based on consistency of selections
  const confidenceBase = blockSelections[1] === 0 ? 0.85 : 0.7;

  // Type names mapping
  const typeNames = {
    '1': 'Reformer',
    '2': 'Helper',
    '3': 'Achiever',
    '4': 'Individualist',
    '5': 'Investigator',
    '6': 'Loyalist',
    '7': 'Enthusiast',
    '8': 'Challenger',
    '9': 'Peacemaker'
  };

  return {
    // Technical name for internal use
    primaryWing: `${primaryType}w${influenceMap[primaryType]}`,
    // User-facing name
    primaryInfluence: `${typeNames[primaryType]} ${influenceMap[primaryType]}`,
    influenceStrength: influenceStrength,
    confidence: confidenceBase
  };
}
```

### 4.6 Mood States Algorithm (Previously "Arrow Determination")

```javascript
function determineMoodStates(primaryType, blockSelections) {
  // Good mood and bad mood direction map
  const moodMap = {
    '1': { goodMood: '7', badMood: '4' },
    '2': { goodMood: '4', badMood: '8' },
    '3': { goodMood: '6', badMood: '9' },
    '4': { goodMood: '1', badMood: '2' },
    '5': { goodMood: '8', badMood: '7' },
    '6': { goodMood: '9', badMood: '3' },
    '7': { goodMood: '5', badMood: '1' },
    '8': { goodMood: '2', badMood: '5' },
    '9': { goodMood: '3', badMood: '6' }
  };

  // Type names mapping for internal reference
  const typeNames = {
    '1': 'Reformer',
    '2': 'Helper',
    '3': 'Achiever',
    '4': 'Individualist',
    '5': 'Investigator',
    '6': 'Sentinel',
    '7': 'Enthusiast',
    '8': 'Challenger',
    '9': 'Peacemaker'
  };

  // 3rd block selection confirms good mood traits
  const goodMoodType = moodMap[primaryType].goodMood;
  const goodMoodStrength = blockSelections[2] === 0 ? 'strong' : 'moderate';

  // 4th block selection confirms bad mood traits
  const badMoodType = moodMap[primaryType].badMood;
  const badMoodStrength = blockSelections[3] === 0 ? 'strong' : 'moderate';

  // Good mood traits by type for constructing descriptions
  const goodMoodTraits = {
    '1': 'more spontaneous, positive, and open to possibilities',
    '2': 'more authentic and in touch with your own needs',
    '3': 'more loyal, committed, and team-oriented',
    '4': 'more disciplined, structured, and principle-focused',
    '5': 'more confident, decisive, and action-oriented',
    '6': 'more peaceful, trusting, and relaxed',
    '7': 'more focused, thoughtful, and depth-oriented',
    '8': 'more emotionally open, supportive, and nurturing',
    '9': 'more motivated, productive, and goal-oriented'
  };

  // Bad mood traits by type for constructing descriptions
  const badMoodTraits = {
    '1': 'more critical, rigid, and perfectionistic',
    '2': 'more controlling, demanding, and confrontational',
    '3': 'more disengaged, indecisive, and procrastinating',
    '4': 'more dependent on approval and emotionally needy',
    '5': 'more scattered, distracted, and avoidant',
    '6': 'more image-conscious, competitive, and superficial',
    '7': 'more critical, judgmental, and detail-fixated',
    '8': 'more withdrawn, detached, and intellectualizing',
    '9': 'more anxious, suspicious, and seeking reassurance'
  };

  return {
    // Technical data for internal use
    goodMoodType: goodMoodType,
    badMoodType: badMoodType,
    goodMoodStrength: goodMoodStrength,
    badMoodStrength: badMoodStrength,
    
    // User-facing descriptions that avoid referencing movement between types
    goodMoodDescription: `When you're in a good mood, you are ${goodMoodTraits[goodMoodType]}`,
    badMoodDescription: `When you're in a bad mood, you are ${badMoodTraits[badMoodType]}`
  };
}
```

## 5. Color Palette Experience (Phase 3)

### 5.1 Interaction Design

- User adjusts three sliders representing psychological states
- Adjustments affect the color scheme of their tower visualization
- Distribution must total 100% (linked sliders)

### 5.2 Visual Design Specifications

#### 5.2.1 Slider Controls

- **Layout:** Three vertical sliders side by side
- **Height:** 300px
- **Width:** 80px per slider, 320px total section
- **Labels:** "Healthy," "Average," "Unhealthy"
- **Colors:** Green (#22c55e), Amber (#f59e0b), Red (#ef4444)
- **Handles:** Circle handles (24px diameter)
- **Track:** 12px width, color matching state
- **Percentage Display:** Numerical percentage above each slider

#### 5.2.2 Tower Color Visualization

- **Real-time Updates:** Colors change as sliders move
- **Gradient Application:** Colors blend from top (healthy) to bottom (unhealthy)
- **Animation:** Smooth color transitions (0.5s)

### 5.3 Color Mapping

- **Healthy State:** Vibrant, saturated colors
- **Average State:** Medium saturation colors
- **Unhealthy State:** Dark, desaturated colors
- Color combinations are specific to each personality type

### 5.4 Implementation Requirements

- Create linked slider component that maintains 100% total
- Implement color interpolation based on slider positions
- Apply colors to tower visualization in real-time
- Store state distribution in application state

### 5.5 State Distribution Algorithm

```javascript
function calculateStateImpact(stateDistribution, personalityType) {
  // Base state descriptions for each type
  const typeStateDescriptions = {
    '1': {
      healthy: "principled, accepting, and balanced",
      average: "critical, perfectionistic, and controlled",
      unhealthy: "judgmental, rigid, and self-righteous"
    },
    '2': {
      healthy: "genuinely helpful, empathetic, and supportive",
      average: "people-pleasing, approval-seeking, and prideful",
      unhealthy: "manipulative, possessive, and self-victimizing"
    },
    '3': {
      healthy: "authentic, self-accepting, and purpose-driven",
      average: "image-focused, competitive, and validation-seeking",
      unhealthy: "deceptive, hostile, and emotionally detached"
    },
    '4': {
      healthy: "creative, emotionally honest, and self-aware",
      average: "melancholic, envious, and self-absorbed",
      unhealthy: "self-destructive, alienating, and emotionally volatile"
    },
    '5': {
      healthy: "insightful, engaged, and intellectually generous",
      average: "detached, private, and intellectually stingy",
      unhealthy: "isolated, nihilistic, and mentally scattered"
    },
    '6': {
      healthy: "courageous, cooperative, and committed",
      average: "anxious, suspicious, and authority-reactive",
      unhealthy: "paranoid, accusatory, and self-defeating"
    },
    '7': {
      healthy: "joyful, focused, and deeply satisfied",
      average: "scattered, escapist, and commitment-avoidant",
      unhealthy: "impulsive, excessive, and painfully unfulfilled"
    },
    '8': {
      healthy: "protective, empowering, and emotionally vulnerable",
      average: "controlling, confrontational, and justice-obsessed",
      unhealthy: "intimidating, destructive, and ruthless"
    },
    '9': {
      healthy: "engaged, present, and purposefully decisive",
      average: "conflict-avoidant, complacent, and self-forgetting",
      unhealthy: "disengaged, stubborn, and neglectful"
    }
  };

  // Calculate weighted description based on distribution
  const description = {
    primary: stateDistribution.healthy >= 50 ? 'healthy' :
             stateDistribution.unhealthy >= 50 ? 'unhealthy' : 'average',
    secondary: determineSecondaryState(stateDistribution),
    description: generateStateDescription(stateDistribution, typeStateDescriptions[personalityType])
  };

  return description;
}

function determineSecondaryState(distribution) {
  const { healthy, average, unhealthy } = distribution;
  const primary = Math.max(healthy, average, unhealthy);
  
  if (primary === healthy) {
    return average > unhealthy ? 'average' : 'unhealthy';
  } else if (primary === average) {
    return healthy > unhealthy ? 'healthy' : 'unhealthy';
  } else {
    return average > healthy ? 'average' : 'healthy';
  }
}

function generateStateDescription(distribution, typeDescriptions) {
  const { healthy, average, unhealthy } = distribution;
  const total = healthy + average + unhealthy;
  
  // Calculate normalized weights
  const healthyWeight = healthy / total;
  const averageWeight = average / total;
  const unhealthyWeight = unhealthy / total;
  
  // Create blended description based on weights
  let description = "";
  
  // Add primary state description
  const primaryState = healthyWeight >= 0.5 ? "healthy" : 
                       unhealthyWeight >= 0.5 ? "unhealthy" : "average";
  
  const primaryThreshold = Math.max(healthyWeight, averageWeight, unhealthyWeight);
  
  // Primary state description
  if (primaryThreshold >= 0.7) {
    // Strong primary state (>70%)
    description += `You are predominantly ${typeDescriptions[primaryState]}. `;
  } else {
    // Moderate primary state
    description += `You are often ${typeDescriptions[primaryState]}. `;
  }
  
  // Add secondary state influence if significant
  const secondaryStates = [
    { name: "healthy", weight: healthyWeight },
    { name: "average", weight: averageWeight },
    { name: "unhealthy", weight: unhealthyWeight }
  ].sort((a, b) => b.weight - a.weight);
  
  // Remove primary state from consideration
  const secondaryState = secondaryStates[0].name === primaryState ? 
                         secondaryStates[1] : secondaryStates[0];
  
  // Only add secondary description if it has significant weight (>20%)
  if (secondaryState.weight >= 0.2) {
    description += `At times, you can be ${typeDescriptions[secondaryState.name]}. `;
  }
  
  // Add growth direction guidance
  if (unhealthyWeight > 0.3) {
    description += `Focus on developing greater self-awareness and support systems to move toward healthier patterns. `;
  } else if (averageWeight > 0.5) {
    description += `Greater mindfulness of your patterns can help you shift toward your healthier traits. `;
  } else if (healthyWeight > 0.6) {
    description += `Continue nurturing the practices that support your well-being and growth. `;
  }
  
  return description;
}
```

## 6. Detail Element Experience (Phase 4)

### 6.1 Interaction Design

- User distributes 10 "detail points" across three areas
- Drag and drop tokens into Self-Preservation, One-to-One, and Social containers
- Distribution determines subtype stacking

### 6.2 Visual Design Specifications

#### 6.2.1 Token Design

- **Size:** 32px × 32px
- **Shape:** Circular
- **Background:** Gradient based on personality type
- **Border:** 1px solid white
- **Shadow:** 0 2px 4px rgba(0,0,0,0.1)
- **Animation:** Subtle pulsing effect when not placed
- **Dragging State:** Scale to 1.1×, shadow increase

#### 6.2.2 Container Design

- **Size:** 200px × 120px
- **Shape:** Rounded rectangle
- **Background:** Semi-transparent (#ffffff40)
- **Border:** 1px dashed #94a3b8
- **Labels:** "Self-Preservation," "One-to-One," "Social"
- **Token Display:** Grid arrangement of placed tokens
- **Fill Visual:** Container fills with color as tokens are added

#### 6.2.3 Subtype Visualization

- **Integration:** Containers connect visually to the tower
- **Visual Indicator:** Tower gains details/patterns based on distribution
- **Dominant Subtype:** Most filled container gets prominent visual treatment

### 6.3 Implementation Requirements

- Create draggable token component
- Implement drop zones with visual feedback
- Track token distribution across containers
- Update application state with subtype distribution
- Apply visual details to tower based on distribution

### 6.4 Subtype Determination Algorithm

```javascript
function determineSubtypeStack(distribution) {
  const { self, oneToOne, social } = distribution;
  
  // Sort subtypes by token count
  const subtypes = [
    { name: 'self', count: self },
    { name: 'oneToOne', count: oneToOne },
    { name: 'social', count: social }
  ].sort((a, b) => b.count - a.count);
  
  // Calculate dominance percentages
  const total = self + oneToOne + social;
  const dominanceScores = {
    self: (self / total) * 100,
    oneToOne: (oneToOne / total) * 100,
    social: (social / total) * 100
  };
  
  // Determine stack type (balanced vs dominant)
  const highestScore = Math.max(...Object.values(dominanceScores));
  const stackType = highestScore >= 50 ? 'dominant' : 'balanced';
  
  return {
    primary: subtypes[0].name,
    secondary: subtypes[1].name,
    tertiary: subtypes[2].name,
    dominance: dominanceScores,
    stackType: stackType
  };
}
```

## 7. Results Visualization and Report

### 7.1 Tower Visualization

#### 7.1.1 Complete Tower

- **Size:** 400px × 600px centered
- **Base:** Circular foundation with stone pattern
- **Structure:** Building blocks forming main tower
- **Colors:** Applied based on state distribution
- **Details:** Visual patterns based on subtype distribution
- **Interaction:** Rotate view (left/right arrows or drag)
- **Animation:** Gentle floating/pulsing of tower

#### 7.1.2 Technical Implementation

- SVG-based visualization (primary)
- Option for Three.js 3D rendering (advanced)
- Component-based construction matching user selections
- Exportable as image file

### 7.2 Written Report

#### 7.2.1 Report Structure

- **Header:** Full personality type name and short description
- **Type Description:** 2-3 paragraphs about core type
- **Influence Profile:** How the secondary influence affects expression of type (formerly "Wing Influence")
- **State Analysis:** Insights based on state distribution
- **Subtype Stack:** Explanation of instinctual variants
- **Growth Path:** Personalized recommendations

#### 7.2.2 Visual Design

- Clean, readable layout
- Section headers with unique icons
- Callout boxes for key insights
- Pull quotes for emphasis
- Progress bar navigation between sections

#### 7.2.3 Technical Implementation

- React-based report component
- Printable/exportable to PDF
- Saves to user account if authenticated

### 7.3 Sample Report Content

#### 7.3.1 Type 1 Sample Report

**The Reformer**

You are principled, purposeful, and self-controlled, driven by a deep desire to be good, balanced, and act with integrity. Your inner critic helps you maintain high standards but can also become overly harsh when you're not at your best.

As a Reformer, you have a keen eye for improvement and strive to make the world better according to your well-developed sense of right and wrong. You value order, structure, and ethical behavior, often holding yourself to exceptionally high standards.

Your greatest strengths include your integrity, reliability, and commitment to doing what's right. You bring clarity, discipline, and fairness to all situations, making you a valuable force for positive change.

**Your Influence: Reformer 9 (The Idealist)**

The Reformer 9 influence brings a calming, harmonizing quality to your nature. This makes you more tolerant, patient, and able to see multiple perspectives before making judgments. You likely:

- Approach improvement with a more measured, less reactive energy
- Prefer to create change through peaceful, orderly means
- Balance your critical perfectionism with acceptance
- Seek not just what's right, but what brings harmony

This influence helps soften your inner critic while maintaining your commitment to high standards and ethical principles.

**Your Mood States**

**In a Good Mood:** When you're in a good mood, you are more spontaneous, positive, and open to new possibilities. You're able to relax your standards, have more fun, and appreciate the joy in life.

**In a Bad Mood:** When you're in a bad mood, you are more withdrawn, emotionally sensitive, and focused on what's missing. You may feel misunderstood and become more critical of yourself and others.

**Your State Distribution**

- Healthy: 30%
- Average: 60%
- Unhealthy: 10%

Your current state indicates that you primarily operate in the average range of your type, with a healthy tendency toward growth.

In your average state, you tend to be organized and improvement-oriented but may sometimes become overly critical or rigid in your thinking. You likely hold yourself to high standards and can be frustrated when others don't share your commitment to doing things "the right way."

Your healthy capacity allows you to access more balance and acceptance, recognizing that imperfection is part of the human experience. When accessing this state, you're more likely to approach improvement with wisdom rather than criticism.

**Your Subtype Stack**

1. Self-Preservation (5 tokens)
2. Social (3 tokens)
3. One-to-One (2 tokens)

As a Self-Preservation dominant Reformer, your focus on improvement and correctness is primarily directed toward creating secure, well-ordered personal environments. You likely:

- Place high importance on establishing reliable routines and systems
- Focus on maintaining cleanliness, organization, and proper maintenance
- Have concerns about health, finances, and future security
- Feel anxious when your personal environment becomes disordered

With Social as your secondary subtype, you also care about social rules, procedures, and group standards, while your One-to-One instinct is less developed, potentially making intimate relationships an area for growth.

#### 7.3.2 Type 9 Sample Report

**The Peacemaker**

You are receptive, easygoing, and supportive, with a deep desire for inner and outer peace. You naturally see and appreciate all perspectives, making you a natural mediator and harmonizer in your relationships and environment.

As a Peacemaker, you have a remarkable ability to bring comfort and stability to others, creating environments where everyone feels heard and accepted. Your calm, steady presence helps defuse tension and makes space for genuine connection.

Your greatest strengths include your diplomatic skills, your ability to find common ground, and your patient, accepting nature. You bring harmony, inclusion, and a steady presence to situations that might otherwise fracture or escalate.

**Your Influence: Peacemaker 1 (The Idealist)**

The Peacemaker 1 influence brings structure and clarity to your nature. This makes you more organized, principled, and discerning while maintaining your harmonious approach. You likely:

- Balance acceptance with appropriate standards and boundaries
- Have a clear sense of right and wrong that guides your diplomacy
- Are more organized and methodical than other Peacemakers
- Put extra effort into making sure things are done correctly

This influence helps you take more decisive action while maintaining your fundamental desire for harmony and peace.

**Your Mood States**

**In a Good Mood:** When you're in a good mood, you are more focused, productive, and able to pursue your own goals with clarity and purpose. You feel more engaged with life and can prioritize your own needs.

**In a Bad Mood:** When you're in a bad mood, you are more anxious, doubtful, and seek reassurance from others. You might worry more about what could go wrong and have trouble making decisions on your own.

**Your State Distribution**

- Healthy: 40%
- Average: 50%
- Unhealthy: 10%

Your current state indicates a fairly balanced distribution between healthy and average qualities, with a minimal presence of unhealthy traits.

In your average state, you tend to be somewhat passive and conflict-avoidant, sometimes losing track of your own priorities and preferences. You may occasionally "check out" mentally when faced with tension or challenging decisions.

Your healthy capacity allows you to maintain inner peace while staying actively engaged with life's challenges. When accessing this state, you're more decisive, present, and able to acknowledge and address problems without losing your natural calm.

**Your Subtype Stack**

1. Social (6 tokens)
2. Self-Preservation (3 tokens)
3. One-to-One (1 token)

As a Social dominant Peacemaker, your focus on harmony and peace is primarily directed toward group dynamics and community belonging. You likely:

- Are highly attuned to group needs and social dynamics
- Feel responsible for maintaining harmony in your communities
- Are more active and engaged when part of a group
- Seek to create inclusive environments where everyone feels valued

With Self-Preservation as your secondary subtype, you also value comfort, stability, and predictable routines, while your One-to-One instinct is less developed, potentially making intense one-on-one relationships feel overwhelming at times.

#### 7.3.4 Subtype Analysis

**Your Subtype Stack**

1. Self-Preservation (5 tokens)
2. Social (3 tokens)
3. One-to-One (2 tokens)

As a Self-Preservation dominant One, your focus on improvement and correctness is primarily directed toward creating secure, well-ordered personal environments. You likely:

- Place high importance on establishing reliable routines and systems
- Focus on maintaining cleanliness, organization, and proper maintenance
- Have concerns about health, finances, and future security
- Feel anxious when your personal environment becomes disordered

With Social as your secondary subtype, you also care about social rules, procedures, and group standards, while your One-to-One instinct is less developed, potentially making intimate relationships an area for growth.

## 8. User Experience Edge Cases

### 8.1 Error States & Recovery

#### 8.1.1 No Selection Made

- **Trigger:** User attempts to proceed without making a selection
- **Visual Feedback:** Subtle shake animation on unselected items
- **UI Change:** Continue button remains disabled
- **Message:** "Please make a selection to continue"

#### 8.1.2 Low Confidence Result

- **Trigger:** Type determination confidence below 65%
- **Handling:** Show multiple possible types with explanation
- **UI Change:** Add "Refine Your Result" option
- **Alternative Flow:** Additional differentiating questions

#### 8.1.3 Network Error

- **Trigger:** Failed API call or data storage
- **Visual Feedback:** Error notification with retry option
- **Data Recovery:** Auto-save to localStorage as backup
- **Fallback:** Continue in offline mode with sync later

### 8.2 User Correction Flows

#### 8.2.1 Back Navigation

- Users can navigate back to previous steps
- Previous selections are preserved
- Changes cause recalculation of subsequent steps
- Confirmation prompt if significant changes detected

#### 8.2.2 Reset Options

- Global reset button returns to start
- Section-specific reset to redo current phase only
- Confirmation dialog prevents accidental resets
- Option to save previous result before resetting

### 8.3 Accessibility Specifications

#### 8.3.1 Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order follows visual flow of the application
- Focus states must be clearly visible
- Keyboard shortcuts for common actions:
  - Space/Enter to select current item
  - Arrow keys to navigate between options
  - Escape to cancel current action

#### 8.3.2 Screen Reader Support

- All interactive elements have proper ARIA attributes
- Custom components use appropriate ARIA roles
- State changes are announced via ARIA live regions
- All images and visualizations have meaningful alt text

#### 8.3.3 Color and Contrast

- All text must have 4.5:1 contrast ratio minimum (WCAG AA)
- Interactive elements have 3:1 contrast ratio minimum
- Color is not used as the only means of conveying information
- High contrast mode option available

## 9. Technical Implementation Details

### 9.1 Component Structure

```
/src
  /components
    /Foundation
      StoneSet.js
      Stone.js
      FoundationBase.js
    /BuildingBlocks
      BlockPair.js
      BuildingBlock.js
      TowerBase.js
    /ColorPalette
      StateSlider.js
      ColorControls.js
      ColorVisualizer.js
    /DetailElements
      Token.js
      SubtypeContainer.js
      DetailVisualizer.js
    /Visualization
      Tower.js
      RotationControls.js
      ExportControls.js
    /Results
      TypeHeader.js
      ReportSection.js
      FullReport.js
    /Common
      ProgressBar.js
      NavigationControls.js
      AnimatedTransition.js
```

### 9.2 State Management

```javascript
// Example state structure
const appState = {
  // User progress
  currentPhase: "foundation", // foundation, building, color, detail, results
  
  // Foundation phase
  foundationSelections: [0, 2, 1, 0, 2, 1, 0, 2, 1], // example selections
  typeCalculation: {
    primaryType: "9",
    typeName: "Peacemaker",
    confidence: 0.85,
    alternatives: ["1", "8"],
    typeMap: {
      "1": 0.25,
      "2": 0.05,
      // etc.
    }
  },
  
  // Building phase
  blockSelections: [0, 1, 0, 1], // example selections
  influenceCalculation: {
    primaryInfluence: "Peacemaker 1",  // User-facing name
    primaryWing: "9w1",  // Internal technical name
    confidence: 0.78
  },
  moodCalculation: {
    // Technical reference (internal only)
    goodMoodType: "3",
    badMoodType: "6", 
    
    // User-facing descriptions
    goodMoodDescription: "When you're in a good mood, you are more motivated, productive, and goal-oriented",
    badMoodDescription: "When you're in a bad mood, you are more anxious, suspicious, and seeking reassurance"
  },
  
  // Color phase
  stateDistribution: {
    healthy: 30,
    average: 60,
    unhealthy: 10
  },
  
  // Detail phase
  subtypeDistribution: {
    self: 3,
    oneToOne: 5,
    social: 2
  },
  
  // Results
  completeProfile: {
    // Combined results from all phases
  }
};
```

### 9.3 Algorithms and Calculations

#### 9.3.1 Type Determination Algorithm

- Weighted scoring system based on foundation stone selections
- Triad identification first (Head/Heart/Body)
- Center focus second (Fear/Shame/Anger)
- Type-specific markers third
- Confidence calculation based on pattern consistency

[Detailed algorithm specifications provided in section 3.4]

#### 9.3.2 Influence Calculation (Formerly "Wing Calculation")

- Based on primary type and block selections
- Evaluates strength of secondary influence
- Considers adjacent types only

[Detailed algorithm specifications provided in section 4.5]

#### 9.3.3 Mood States Determination (Formerly "Arrow Determination")

- Maps good mood and bad mood traits
- Validates against block selections
- Generates descriptions avoiding reference to type movement

[Detailed algorithm specifications provided in section 4.6]

#### 9.3.4 Subtype Stacking

- Direct mapping from token distribution
- Calculates percentage influence of each subtype
- Determines dominant variant

[Detailed algorithm specifications provided in section 6.4]

### 9.4 Animation and Transition Specifications

#### 9.4.1 Phase Transitions

- Smooth fade transition between phases
- Previous phase elements slide out while new elements slide in
- Tower visualization persists and updates between phases
- Progress indicator updates with each phase

#### 9.4.2 Selection Animations

- Stone selection: Subtle pulse, then float to foundation
- Block selection: Highlight, then fly to tower position
- Slider adjustment: Smooth color transition
- Token dragging: Pick-up effect, snap to container

### 9.5 Responsive Design Requirements

- **Mobile Layout:** Single column, vertically stacked
- **Tablet Layout:** Optimized for touch interaction
- **Desktop Layout:** Side-by-side visualization and controls
- **Breakpoints:** 640px, 768px, 1024px, 1280px
- Mobile-first approach with progressive enhancement

## 10. Implementation Timeline and Milestones

### 10.1 Phase 1: Core Foundation Experience

- Foundation Stone component creation
- Selection tracking implementation
- Basic visualization of foundation
- Primitive type calculation

### 10.2 Phase 2: Building Block Experience

- Building Block component creation
- Block pair interaction
- Tower base visualization
- Wing and arrow calculations

### 10.3 Phase 3: Full Assessment Flow

- Color adjustment implementation
- Detail distribution implementation
- Full tower visualization
- Complete profile calculation

### 10.4 Phase 4: Results and Refinement

- Results display implementation
- Report generation
- Final visual polish
- Performance optimization

## 11. Testing Requirements

### 11.1 Functional Testing

- Verify all interaction points work correctly
- Ensure calculations produce expected results
- Validate visualization updates appropriately
- Test all edge cases in selection patterns

### 11.2 Visual Testing

- Verify all components match design specifications
- Ensure animations perform smoothly
- Validate responsive behavior across devices
- Test accessibility features

### 11.5 Visual Reference Materials

To ensure visual consistency and accurate implementation, the following visual reference materials should be created and included with this specification:

#### 11.5.1 Required Visual Reference Materials

1. **Component Visual Mockups**
   - Foundation Stone design variations (for all three types)
   - Building Block design variations (showing both options in each pair)
   - Color Slider component in various states
   - Token and Container design for the Detail Elements phase
   - Complete Tower visualization example

2. **User Flow Diagrams**
   - Step-by-step visualization of the complete assessment flow
   - Annotated transitions between phases
   - Error state handling visualizations

3. **Interactive Prototype**
   - Browser-based clickable prototype demonstrating the core interactions
   - Animation reference showing expected transitions and feedback

4. **Color and Style Guide**
   - Visual representation of all color palettes
   - Typography samples with all text styles
   - Component style variations (hover, active, selected states)
   - Design system documentation

5. **Tower Visualization Reference**
   - Examples of completed towers for various personality combinations
   - Illustration of how state distribution affects coloration
   - Illustration of how subtype distribution affects detailing

#### 11.5.2 Visual Asset Requirements

All visual assets should be provided in the following formats:

1. **Design Files**
   - Figma or Adobe XD source files
   - Component libraries with all reusable elements

2. **Image Assets**
   - SVG format for all icons and line illustrations
   - PNG format with transparent backgrounds for complex elements
   - Multiple resolution versions for responsive design

3. **Animation References**
   - GIF or MP4 format demonstrating expected animations
   - Timing specifications for all transitions
   - Easing curve documentation

The visual reference materials must adhere to the terminology requirements specified in section 1.5, avoiding any mention of "Enneagram" and using the approved alternative terminology throughout all visual assets and mockups.

## 12. CRITICAL IMPLEMENTATION NOTES

1. **Terminology Requirements:**
   - Never use the term "Enneagram" in any user-facing content
   - Use "Reformer 9" instead of "1w9" format in all user-facing text
   - Use "Good Mood" and "Bad Mood" instead of integration/disintegration terms
   - Ensure all UI labels, instructions, and reports follow these naming conventions

2. **Reference This Document Continuously:**
   - Check this specification BEFORE implementing any component
   - Verify all visual elements against the specifications
   - Confirm all algorithms match the described functionality

3. **Visual Accuracy Priority:**
   - All visual elements must match specifications exactly
   - Color values, sizes, spacing must be precise
   - Animations must follow timing and easing specifications

4. **Phased Implementation:**
   - Build and test one phase completely before moving to the next
   - Validate each phase against specifications
   - Integrate phases only after individual validation

5. **Validation Checkpoints:**
   - After implementing each major component, verify against specs
   - Request review of visualization accuracy
   - Confirm algorithm implementations
   - Verify terminology compliance in all user-facing text

By following this technical specification, the Personality Mosaic system will be implemented with high fidelity to the design vision, creating an engaging and accurate personality assessment experience while maintaining the required terminology throughout the user experience.
