import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

export default function PellEditorScreen() {
  const richText = useRef<RichEditor>(null);
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const theme = Colors[colorScheme ?? "light"];

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
    richText.current?.blurContentEditor();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        {/* Rich Editor */}
        <ScrollView
          style={[
            styles.editorContainer,
            { backgroundColor: theme.background },
          ]}
          keyboardDismissMode="interactive"
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          onScrollBeginDrag={handleDismissKeyboard}
        >
          {/* Editor Container */}
          <View style={styles.editorWrapper}>
            <RichEditor
              ref={richText}
              placeholder="Start typing here..."
              editorStyle={{
                backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
                color: isDark ? "#ffffff" : "#000000",
                placeholderColor: isDark ? "#888888" : "#a0a0a0",
                contentCSSText: `
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.6;
                  padding: 16px;
                `,
                initialCSSText: `
                  body {
                    margin: 0;
                    padding: 0;
                  }
                `,
              }}
              androidLayerType="hardware"
              androidHardwareAccelerationDisabled={false}
            />
          </View>
        </ScrollView>

        {/* Rich Toolbar */}
        <View
          style={[
            styles.toolbarContainer,
            { backgroundColor: theme.background },
          ]}
        >
          <RichToolbar
            editor={richText}
            actions={[
              actions.undo,
              actions.redo,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.setStrikethrough,
              actions.heading1,
              actions.heading2,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.checkboxList,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
              actions.blockquote,
              actions.code,
              actions.line,
              actions.insertLink,
              actions.insertImage,
              actions.removeFormat,
              actions.keyboard,
            ]}
            iconTint={theme.text}
            selectedIconTint={theme.tint}
            disabledIconTint={isDark ? "#444444" : "#cccccc"}
            style={[
              styles.toolbar,
              { borderTopColor: isDark ? "#333" : "#ddd" },
            ]}
            flatContainerStyle={styles.flatToolbar}
          />
        </View>
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
  editorContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  editorWrapper: {
    flex: 1,
    minHeight: 300,
  },
  toolbarContainer: {
    borderTopWidth: 1,
  },
  toolbar: {
    backgroundColor: "transparent",
    minHeight: 50,
  },
  flatToolbar: {
    paddingHorizontal: 8,
  },
});
