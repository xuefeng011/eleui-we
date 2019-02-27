Component({
    externalClasses: ['el-class'],

    properties: {
        // ghost, success, warning, error, disable
        type: {
            type: String,
            value: ''
        },
        plain: {
            type: Boolean,
            value: false
        },
        round: {
            type: Boolean,
            value: false
        },
        circle: {
            type: Boolean,
            value: false
        },
        loading: {
            type: Boolean,
            value: false
        },
        disabled: {
            type: Boolean,
            value: false
        }

    },

    methods: {
        handleTap() {
            if (this.data.disabled) return false;

            this.triggerEvent('click');
        }
    }
});