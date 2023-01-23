package com.myapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioManager;
import android.os.Build;
import android.os.Environment;
import android.os.PowerManager;
import android.os.StatFs;
import android.os.BatteryManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import java.math.BigInteger;

import javax.annotation.Nonnull;

import static android.os.BatteryManager.BATTERY_STATUS_CHARGING;
import static android.os.BatteryManager.BATTERY_STATUS_FULL;

@ReactModule(name = RNDeviceModule.NAME)
public class RNDeviceModule extends ReactContextBaseJavaModule {
    public static final String NAME = "RNDeviceInfo";
    private BroadcastReceiver receiver;
    private BroadcastReceiver headphoneConnectionReceiver;

    private static final String BATTERY_LEVEL= "batteryLevel";

    public RNDeviceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getBatteryLevelSync() {
        Intent intent = getReactApplicationContext().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        WritableMap powerState = getPowerStateFromIntent(intent);

        if(powerState == null) {
            return 0;
        }

        return powerState.getDouble(BATTERY_LEVEL);
    }

    @ReactMethod
    public void getBatteryLevel(Promise p) { p.resolve(getBatteryLevelSync()); }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getFreeDiskStorageSync() {
        try {
            StatFs rootDir = new StatFs(Environment.getRootDirectory().getAbsolutePath());
            StatFs dataDir = new StatFs(Environment.getDataDirectory().getAbsolutePath());

            Boolean intApiDeprecated = Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2;
            long rootAvailableBlocks = getTotalAvailableBlocks(rootDir, intApiDeprecated);
            long rootBlockSize = getBlockSize(rootDir, intApiDeprecated);
            double rootFree = BigInteger.valueOf(rootAvailableBlocks).multiply(BigInteger.valueOf(rootBlockSize)).doubleValue();

            long dataAvailableBlocks = getTotalAvailableBlocks(dataDir, intApiDeprecated);
            long dataBlockSize = getBlockSize(dataDir, intApiDeprecated);
            double dataFree = BigInteger.valueOf(dataAvailableBlocks).multiply(BigInteger.valueOf(dataBlockSize)).doubleValue();

            return rootFree + dataFree;
        } catch (Exception e) {
            return -1;
        }
    }
    @ReactMethod
    public void getFreeDiskStorage(Promise p) { p.resolve(getFreeDiskStorageSync()); }

    private long getTotalAvailableBlocks(StatFs dir, Boolean intApiDeprecated) {
        return (intApiDeprecated ? dir.getAvailableBlocksLong() : dir.getAvailableBlocks());
    }

    private long getBlockSize(StatFs dir, Boolean intApiDeprecated) {
        return (intApiDeprecated ? dir.getBlockSizeLong() : dir.getBlockSize());
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isHeadphonesConnectedSync() {
        AudioManager audioManager = (AudioManager)getReactApplicationContext().getSystemService(Context.AUDIO_SERVICE);
        return audioManager.isWiredHeadsetOn() || audioManager.isBluetoothA2dpOn();
    }
    @ReactMethod
    public void isHeadphonesConnected(Promise p) {p.resolve(isHeadphonesConnectedSync());}

    private WritableMap getPowerStateFromIntent (Intent intent) {
        if(intent == null) {
            return null;
        }

        int batteryLevel = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int batteryScale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        int isPlugged = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
        int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);

        float batteryPercentage = batteryLevel / (float)batteryScale;

        String batteryState = "unknown";

        if(isPlugged == 0) {
            batteryState = "unplugged";
        } else if(status == BATTERY_STATUS_CHARGING) {
            batteryState = "charging";
        } else if(status == BATTERY_STATUS_FULL) {
            batteryState = "full";
        }

        PowerManager powerManager = (PowerManager)getReactApplicationContext().getSystemService(Context.POWER_SERVICE);
        boolean powerSaveMode = false;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            powerSaveMode = powerManager.isPowerSaveMode();
        }

        WritableMap powerState = Arguments.createMap();
        String BATTERY_STATE = "batteryState";
        powerState.putString(BATTERY_STATE, batteryState);
        powerState.putDouble(BATTERY_LEVEL, batteryPercentage);
        String LOW_POWER_MODE = "lowPowerMode";
        powerState.putBoolean(LOW_POWER_MODE, powerSaveMode);

        return powerState;
    }

    @Override
    @Nonnull
    public String getName() {
        return NAME;
    }
}
