// -*- coding: utf-8 -*-

'use strict'

///////////////////////////////////////////
// settings

const default_course = 'mat * vec'
const course_menu = [
    // [group_label, [
    //     [course_label, [
    //         [operator, A_size, B_size],
    //         ...
    ['Row Vector', [
        ['num * row', [
            ['*', [1, 1], [1, 2]],
            ['*', [1, 1], [1, 2]],
            ['*', [1, 1], [1, 2]],
            ['*', [1, 1], [1, 3]],
            ['*', [1, 1], [1, 3]],
        ]],
        ['row +', [
            ['+', [1, 2], [1, 2]],
            ['+', [1, 2], [1, 2]],
            ['+', [1, 2], [1, 2]],
            ['+', [1, 3], [1, 3]],
            ['+', [1, 3], [1, 3]],
        ]],
        ['row -', [
            ['-', [1, 2], [1, 2]],
            ['-', [1, 2], [1, 2]],
            ['-', [1, 2], [1, 2]],
            ['-', [1, 3], [1, 3]],
            ['-', [1, 3], [1, 3]],
        ]],
        ['row .', [
            ['.', [1, 2], [1, 2]],
            ['.', [1, 2], [1, 2]],
            ['.', [1, 2], [1, 2]],
            ['.', [1, 3], [1, 3]],
            ['.', [1, 3], [1, 3]],
        ]],
    ]],
    ['Column Vector', [
        ['num * col', [
            ['*', [1, 1], [2, 1]],
            ['*', [1, 1], [2, 1]],
            ['*', [1, 1], [2, 1]],
            ['*', [1, 1], [3, 1]],
            ['*', [1, 1], [3, 1]],
        ]],
        ['col +', [
            ['+', [2, 1], [2, 1]],
            ['+', [2, 1], [2, 1]],
            ['+', [2, 1], [2, 1]],
            ['+', [3, 1], [3, 1]],
            ['+', [3, 1], [3, 1]],
        ]],
        ['col -', [
            ['-', [2, 1], [2, 1]],
            ['-', [2, 1], [2, 1]],
            ['-', [2, 1], [2, 1]],
            ['-', [3, 1], [3, 1]],
            ['-', [3, 1], [3, 1]],
        ]],
        ['col .', [
            ['.', [2, 1], [2, 1]],
            ['.', [2, 1], [2, 1]],
            ['.', [2, 1], [2, 1]],
            ['.', [3, 1], [3, 1]],
            ['.', [3, 1], [3, 1]],
        ]],
    ]],
    ['Matrix', [
        ['num * mat', [
            ['*', [1, 1], [2, 2]],
            ['*', [1, 1], [2, 2]],
            ['*', [1, 1], [2, 3]],
            ['*', [1, 1], [3, 2]],
            ['*', [1, 1], [3, 3]],
        ]],
        ['mat +', [
            ['+', [2, 2], [2, 2]],
            ['+', [2, 2], [2, 2]],
            ['+', [2, 3], [2, 3]],
            ['+', [3, 2], [3, 2]],
            ['+', [3, 3], [3, 3]],
        ]],
        ['mat -', [
            ['-', [2, 2], [2, 2]],
            ['-', [2, 2], [2, 2]],
            ['-', [2, 3], [2, 3]],
            ['-', [3, 2], [3, 2]],
            ['-', [3, 3], [3, 3]],
        ]],
        ['mat * vec', [
            ['*', [2, 2], [2, 1]],
            ['*', [2, 2], [2, 1]],
            ['*', [2, 3], [3, 1]],
            ['*', [3, 2], [2, 1]],
            ['*', [3, 3], [3, 1]],
        ]],
        ['mat * mat', [
            ['*', [2, 2], [2, 2]],
            ['*', [2, 2], [2, 2]],
            ['*', [2, 3], [3, 2]],
            ['*', [3, 2], [2, 2]],
            ['*', [3, 2], [2, 3]],
        ]],
        ['transpose', [
            // [1, 1] is dummy.
            ['t', [1, 2], [1, 1]],
            ['t', [3, 1], [1, 1]],
            ['t', [2, 2], [1, 1]],
            ['t', [3, 2], [1, 1]],
            ['t', [2, 3], [1, 1]],
        ]],
    ]],
    ['Bonus', [
        ['row * col', [
            ['*', [1, 2], [2, 1]],
            ['*', [1, 2], [2, 1]],
            ['*', [1, 2], [2, 1]],
            ['*', [1, 3], [3, 1]],
            ['*', [1, 3], [3, 1]],
        ]],
        ['col * row', [
            ['*', [2, 1], [1, 2]],
            ['*', [2, 1], [1, 2]],
            ['*', [2, 1], [1, 3]],
            ['*', [3, 1], [1, 2]],
            ['*', [3, 1], [1, 3]],
        ]],
    ]],
]

// elements of answer matrix should satisfy...
const lower_bound_of_max_abs = 2
const upper_bound_of_max_abs = 20
const upper_bound_of_mean_abs = 7

const matrix_element_candidates = [
    // [elements, frequency (int)]
    // major
    [[0], 5],
    [[1, 2, 3], 10],
    // minor
    [[4, 5], 3],
    [[6, 7, 8, 9], 1],
    [[-1, -2, -3], 2],
    [[-4, -5, -6, -7, -8, -9], 1],
].map(([xs, freq]) => repeated_array(freq, xs)).flat(Infinity)

const operator_for = {
    '*': {func: mul},
    '+': {func: add, text: '+'},
    '-': {func: sub, text: '-'},
    '.': {func: dot, text: '&#x22C5;'},
    't': {func: trans, text: '!transpose!'},
}

const course_select = Q('#course'), questions_ol = Q('#questions')

initialize_course()

///////////////////////////////////////////
// course

function initialize_course() {
    initialize_course_menu()
    renew_course()
}

function renew_course() {
    const seed = course_select.value + (Q('#seed').value || Date.now())
    Math.seedrandom(seed)
    clear_questions()
    append_course_questions()
}

function clear_questions() {questions_ol.innerHTML = ''}

function append_course_questions() {
    course_questions(course_select.value).forEach(append_question)
}

function course_questions(course_label) {
    const all_courses = course_menu.flatMap(([group_label, courses]) => courses)
    return object_from_key_value_pairs(all_courses)[course_label]
}

///////////////////////////////////////////
// each question

function append_question([op, a_size, b_size]) {
    const [a, b, ans] = generate_question(op, a_size, b_size)
    const op_t = op_text(op)
    const m_a = mmat(a), m_b = mmat(b), m_ans = mmat(ans, 'ans')
    const left_hand_side = !op_t ? [m_a, m_b] :
          op_t === '!transpose!' ? [mtrans(m_a)] :
          [m_a, mo(op_t), m_b]
    const html = mathml(...left_hand_side, mo('='), m_ans)
    const button = '<button class="show_ans" onclick="show_ans(this)">?</button>'
    append_question_html(html + button)
}

function generate_question(op, a_size, b_size) {
    while (true) {
        const a = rand_mat(...a_size), b = rand_mat(...b_size)
        const ans = apply_op(op, a, b)
        if (is_appropriate(a, b, ans)) {return [a, b, ans]}
    }
}

function is_appropriate(a, b, ans) {
    const abs_vals = ans.flat().map(Math.abs), max_abs = Math.max(...abs_vals)
    const too_small = max_abs < lower_bound_of_max_abs
    const too_large = max_abs > upper_bound_of_max_abs ||
          mean(abs_vals) > upper_bound_of_mean_abs
    const redundant = has_dup(a.flat()) || has_dup(b.flat())
    if (is_scalar(a)) {return Math.abs(a[0][0]) > 1 && !too_small && !redundant}
    if (is_col_vector(a) && is_row_vector(b) && redundant) {return false}
    return !too_small && !too_large
}

function apply_op(op, a, b) {return operator_for[op].func(a, b)}
function op_text(op) {return operator_for[op].text}

///////////////////////////////////////////
// HTML manipulation

function initialize_course_menu() {
    let i = 1
    const option = label => `<option value="${label}">(${i++}) ${label}</option>`
    const options_for = courses => {
        const labels = courses.map(([label, _]) => label)
        return map_join(labels, option)
    }
    const optgroup = (([group_label, courses]) =>
        `<optgroup label="${group_label}">${options_for(courses)}</optgroup>`)
    course_select.innerHTML = map_join(course_menu, optgroup)
    course_select.value = default_course
}

function append_question_html(html) {
    const li = document.createElement('li')
    li.innerHTML = html
    li.setAttribute('data-revealed', 'no')
    questions_ol.appendChild(li)
    update_reveal_all_button()
}

function append_more() {
    const old_last = questions_ol.lastElementChild
    append_course_questions()
    old_last.scrollIntoView({behavior: 'smooth', block: 'start'})
}

function show_ans(clicked_button) {
    clicked_button.parentNode.setAttribute('data-revealed', 'yes')
    clicked_button.remove()
    update_reveal_all_button()
}

function reveal_all() {Q_all('.show_ans').forEach(button => button.click())}
function update_reveal_all_button() {
    Q('#reveal_all').disabled = (Q_all('.show_ans').length === 0)
}

///////////////////////////////////////////
// matrix & vector

// random matrix

function rand_mat(rows, cols) {
    const rand = _ => rand_choice(matrix_element_candidates)
    return new_array(rows, _ => new_array(cols, rand))
}

// matrix operation

function mul(a, b) {
    if (is_scalar(a)) {return scalar_mul(a[0][0], b)}
    const cols = trans(b)
    return a.map(row => cols.map(col => inner(row, col)))
}

function scalar_mul(c, b) {return b.map(row => row.map(x => c * x))}

function dot(a, b) {return [[inner(a.flat(), b.flat())]]}

function add(a, b) {
    const vec_add = (v, w) => zip_map(v, w, (x, y) => x + y)
    return zip_map(a, b, vec_add)
}

function sub(a, b) {return add(a, scalar_mul(-1, b))}

function trans(m) {return m[0].map((_, i) => m.map(row => row[i]))}

// shape checker

function is_scalar(mat) {return is_row_vector(mat) && is_col_vector(mat)}
function is_vector(mat) {return is_row_vector(mat) || is_col_vector(mat)}
function is_row_vector(mat) {return mat.length === 1}
function is_col_vector(mat) {return mat[0].length === 1}

// vector util

function sum(v) {return v.reduce((acc, z) => acc + z, 0)}
function mean(v) {return sum(v) / v.length}
function inner(v, w) {return sum(zip_map(v, w, (x, y) => x * y))}
function zip_map(v, w, f) {return v.map((_, i) => f(v[i], w[i]))}

///////////////////////////////////////////
// MathML

function mathml(...parts) {return tag('math', map_join(parts, mrow))}

function mmat(mat, klass) {
    if (klass) {return mrow(mmat(mat), {'class': klass})}
    if (is_scalar(mat)) {return mn(mat[0][0])}
    const mtd = x => tag('mtd', mn(x))
    const sep = is_row_vector(mat) && mo(',')
    const mtr = row => tag('mtr', map_join(row, mtd, sep))
    return mo('(') + tag('mtable', map_join(mat, mtr)) + mo(')')
}

function mtrans(z) {return tag('msup', mrow(z) + mo('T'))}

function mrow(z, prop) {return tag('mrow', z, prop)}
function mo(z) {return tag('mo', z)}
function mn(z) {return tag('mn', z)}

function tag(tag_name, content, prop) {
    const extra = Object.keys(prop || {}).map(key => `${key}="${prop[key]}"`)
    return `<${[tag_name, ...extra].join(' ')}>${content}</${tag_name}>`
}

///////////////////////////////////////////
// util

function Q(selector) {return document.querySelector(selector)}
function Q_all(selector) {return document.querySelectorAll(selector)}

function new_array(len, f) {return [...Array(len)].map(f)}
function repeated_array(len, x) {return new_array(len, _ => x)}
function map_join(ary, f, sep) {return ary.map(f).join(sep || '')}
function has_dup(ary) {return ary.length !== new Set(ary).size}
function rand_choice(ary) {return ary[Math.floor(Math.random() * ary.length)]}
function object_from_key_value_pairs(pairs) {
    const h = {}; pairs.forEach(([k, v]) => h[k] = v); return h
}
