import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { RichText, useEditorBridge } from "@10play/tentap-editor";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function TentapEditorScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    initialContent: "",
  });

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
    editor.blur();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardDismissMode="interactive"
          scrollEventThrottle={16}
          onScrollBeginDrag={handleDismissKeyboard}
        >
          {/* Editor Container */}
          <View style={styles.editorWrapper}>
            <RichText
              onPointerLeave={handleDismissKeyboard}
              editor={editor}
              style={styles.richText}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topDismissArea: {
    height: 50,
    width: "100%",
  },
  editorWrapper: {
    flex: 1,
    padding: 16,
    minHeight: 300,
  },
  richText: {
    flex: 1,
  },
  bottomDismissArea: {
    height: 100,
    width: "100%",
  },
  toolbarContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});
