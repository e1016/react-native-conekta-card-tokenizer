
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNConektaCardTokenizerSpec.h"

@interface ConektaCardTokenizer : NSObject <NativeConektaCardTokenizerSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ConektaCardTokenizer : NSObject <RCTBridgeModule>
#endif

@end
